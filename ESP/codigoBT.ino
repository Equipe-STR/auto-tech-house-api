#include "BluetoothSerial.h"
#include "WiFi.h"
#include <HTTPClient.h>
#include <Arduino_JSON.h>

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
  Serial.begin(115200);
  configurarWifi();
  SerialBT.begin("ESP32_BT"); 
  Serial.println("O dispositivo começou, agora você pode emparelhar com ele!");
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
