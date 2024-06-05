#include "WiFi.h"
#include <AsyncTCP.h>
#include <Arduino_JSON.h>
#include <ArduinoWebsockets.h>
#include <Arduino_JSON.h>

using namespace websockets;

#define PIN_PRESENCA 14
#define PIN_BUZZER 17
#define PIN_FOGO 26
#define PIN_FONTE 16

JSONVar readings;

unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

const char* websockets_server_host = "192.168.1.132"; // Endereço do servidor WebSocket
const int websockets_server_port = 8080; // Porta do servidor WebSocket
WebsocketsClient client;

const char* ssid = "MOB-AP 202";
const char* password = "oisd2024ufc";

void configurarWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wifi....");
  }
  Serial.print("IP para conectar: ");
  Serial.println(WiFi.localIP());
}

void conectarWebSocket(){
    bool connected = client.connect(websockets_server_host, websockets_server_port, "/");
    if (connected) {
        Serial.println("Conectado ao servidor WebSocket");
        client.send("{\"status\": \"conexaoESP\"}");
    } else {
        Serial.println("Falha ao conectar ao servidor WebSocket");
    }
}

void configureIOPin(){
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_PRESENCA, INPUT);
  pinMode(PIN_FOGO, INPUT);
}

void acionaBuzzer(){
  tone(PIN_BUZZER, 1000);
  delay(300);
  tone(PIN_BUZZER, 500);
  delay(200);
}
void getSensorPresenca(){
  int sinalPresenca;
  // if (ativacaoAlarme){
    sinalPresenca = digitalRead(PIN_PRESENCA);
    readings["alarme"] = sinalPresenca;
    if(sinalPresenca == HIGH){
      Serial.println(sinalPresenca);
    }
  // }
  // else{
  //   sinalPresenca = 0;
  // }
  // String valorFogo = ((const char*) (readings["leituraFogo"]));
  // if(sinalPresenca == HIGH){
  //   acionaBuzzer();
  // }
  // //LOW: Nada detectado
  // else if (valorFogo=="0"){
  //   // Desativa o buzzer
  //   noTone(PIN_BUZZER);
  // }
  // readings["sinalPresenca"] = String(sinalPresenca);
  // readings["ativacaoAlarme"] = String(ativacaoAlarme);  
}

void setup(){
  readings["status"] = "conexaoESP";
  configureIOPin();
  Serial.begin(9600);
  configurarWifi();
  client.onMessage([](WebsocketsMessage message) {
        Serial.print("Mensagem recebida: ");
        Serial.println(message.data());
    });

    // Definir função de callback para eventos de conexão
    client.onEvent([](WebsocketsEvent event, String data) {
        if(event == WebsocketsEvent::ConnectionOpened) {
            Serial.println("Conexão aberta");
        } else if(event == WebsocketsEvent::ConnectionClosed) {
            Serial.println("Conexão fechada");
        } else if(event == WebsocketsEvent::GotPing) {
            Serial.println("Recebeu um Ping!");
        } else if(event == WebsocketsEvent::GotPong) {
            Serial.println("Recebeu um Pong!");
        }
    });
  conectarWebSocket();
}

void loop(){
  // Serial.println(WiFi.localIP());
  while (1){
    getSensorPresenca();
    client.poll();
    if ((millis() - lastTime) > timerDelay) {
      lastTime = millis();
      Serial.println(JSON.stringify(readings));
      client.send(JSON.stringify(readings));
    }
  }
}