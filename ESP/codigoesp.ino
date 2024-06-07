#include "WiFi.h"
#include <AsyncTCP.h>
#include <Arduino_JSON.h>
#include <ArduinoWebsockets.h>

using namespace websockets;

#define PIN_FOGO 16
#define PIN_PRESENCA 17
#define PIN_FONTE 18

JSONVar readings;

unsigned long lastTime = 0;
unsigned long timerDelay = 1000;

const char* websockets_server_host = "192.168.0.106"; // Endereço do servidor WebSocket
const int websockets_server_port = 8080; // Porta do servidor WebSocket
WebsocketsClient client;

const char* ssid = "wifi_inacio.";
const char* password = "zenilda11";
JSONVar status;

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
  pinMode(PIN_FONTE, INPUT);
  pinMode(PIN_PRESENCA, INPUT);
  pinMode(PIN_FOGO, INPUT);
}

void getSensorPresenca(){
  int sinalPresenca;
  sinalPresenca = digitalRead(PIN_PRESENCA);
  if (status["alarmeFuncionando"]) {
    readings["alarme"] = sinalPresenca;
  }
}

void getSensorChama(){
  int sinalChama;
  sinalChama = digitalRead(PIN_FOGO);
  if (status["incendioFuncionando"]) {
    readings["incendio"] = sinalChama;
  }
}

void getPinFonte(){
  int sinalFonte;
  sinalFonte = digitalRead(PIN_FONTE);
  if (sinalFonte) {
    readings["fonte"] = 1;
  }
  else {
    readings["fonte"] = 2;
  }
}

void setup(){
  readings["status"] = "conexaoESP";
  configureIOPin();
  Serial.begin(9600);
  configurarWifi();
  client.onMessage([](WebsocketsMessage message) {
      Serial.print("Mensagem recebida: ");
      Serial.println(message.data());
      status = JSON.parse(message.data());
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
    client.poll();
    if ((millis() - lastTime) > timerDelay) {
      getSensorPresenca();
      getSensorChama();
      getPinFonte();
      lastTime = millis();
      Serial.println(JSON.stringify(readings));
      client.send(JSON.stringify(readings));
    }
  }
}