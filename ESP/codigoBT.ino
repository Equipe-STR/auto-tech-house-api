#include "BluetoothSerial.h"
#include "WiFi.h"
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <ESP32Servo.h>

// Definições
#define LDR_ESQUERDO 36  // GPIO 36 é um pino ADC no ESP32
#define LDR_DIREITO 39   // GPIO 39 é um pino ADC no ESP32
#define PINO_SERVO 18    // GPIO 18 é um pino PWM no ESP32

// Variáveis globais
int posicaoAtual;
Servo servoMotor;

const char* ssid = "MOB-AP 202";
const char* password = "oisd2024ufc";

JSONVar respostaBT;
BluetoothSerial SerialBT;

void configurarWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wifi....");
  }
  Serial.print("IP para conectar: ");
  Serial.println(WiFi.localIP());
}


void setup() {
  Serial.begin(9600);
  configurarWifi();
  SerialBT.begin("ESP32_BT"); 
  Serial.println("O dispositivo começou, agora você pode emparelhar com ele!");
  servoMotor.attach(PINO_SERVO);
  pinMode(LDR_ESQUERDO, INPUT);
  pinMode(LDR_DIREITO, INPUT);
  posicaoAtual = calcularPosicao(analogRead(LDR_ESQUERDO)*1023/4095, analogRead(LDR_DIREITO)*1023/4095);
  servoMotor.write(posicaoAtual);

  xTaskCreate(TaskMoverSuavemente, "MoverSuavemente", 2048, NULL, 1, NULL);
}

void loop() {
  if (SerialBT.available()) {
    Serial.println("Mensagem Recebida");
    String incoming = SerialBT.readString();
    HTTPClient http;

    http.begin("http://192.168.1.132:8080/sensorsReading/");

    int httpCode = http.GET();
    Serial.println(httpCode);
    String formattedData = "";
    if (httpCode > 0) {
      String payload = http.getString();
      respostaBT = JSON.parse(payload);
      for (int i = 0; i < respostaBT.length(); i++) {
        // Extrai name e date de cada objeto
        const char* name = respostaBT[i]["name"];
        const char* date = respostaBT[i]["date"];
        // Formata os dados em uma única string
        formattedData += String(name) + " - " + String(date) + "\n";
      }
      
      Serial.println(formattedData);
      SerialBT.println(formattedData);
    } else {
      // Se houve um erro na requisição, exibe o código de erro
      Serial.printf("Falha na requisição HTTP: %s\n", http.errorToString(httpCode).c_str());
    }

    // Fecha a conexão HTTP
    http.end();
  }

  // Envia dados do monitor serial para o Bluetooth
  if (Serial.available()) {
    String incoming = Serial.readString();
    SerialBT.print("Enviado via Bluetooth: ");
    SerialBT.println(incoming);
  }
}

void TaskMoverSuavemente(void *pvParameters) {
  (void) pvParameters;
  for (;;) {
    moverSuavemente(calcularPosicao(analogRead(LDR_ESQUERDO)*1023/4095, analogRead(LDR_DIREITO)*1023/4095));
    vTaskDelay(pdMS_TO_TICKS(500)); // Delay de 100 ms
  }
}

int calcularPosicao(int leituraEsquerda, int leituraDireita) {
  Serial.println("Leitura LDR:");
  Serial.println(leituraEsquerda);
  Serial.println(leituraDireita);
  HTTPClient http;

  http.begin("http://192.168.1.132:8080/ia/");
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST("{\"right\": " + String(leituraEsquerda) + ", \"left\": " + String(leituraDireita) + "}");
  Serial.println(httpCode);
  String formattedData = "";
  int resultado;
  if (httpCode > 0) {
    String payload = http.getString();
    int startPos = payload.indexOf(':') + 1;

    int endPos = payload.indexOf('}');

    String numberString = payload.substring(startPos, endPos);

    // Converter a substring para um número inteiro
    resultado = numberString.toInt();
    Serial.println(resultado);
  } else {
    // Se houve um erro na requisição, exibe o código de erro
    Serial.printf("Falha na requisição HTTP: %s\n", http.errorToString(httpCode).c_str());
  }

  // Fecha a conexão HTTP
  http.end();
  return resultado;
}

void moverSuavemente(int posicaoDesejada) {  
  Serial.println("Posição:");
  Serial.println(posicaoDesejada);
  if (posicaoAtual < posicaoDesejada) {
    for (int pos = posicaoAtual; pos <= posicaoDesejada; pos++) {
      servoMotor.write(pos);
      vTaskDelay(pdMS_TO_TICKS(40)); // pequeno atraso para permitir o movimento do servo
    }
  } else if (posicaoAtual > posicaoDesejada) {
    for (int pos = posicaoAtual; pos >= posicaoDesejada; pos--) {
      servoMotor.write(pos);
      vTaskDelay(pdMS_TO_TICKS(40)); // pequeno atraso para permitir o movimento do servo
    }
  }
  posicaoAtual = posicaoDesejada;
}