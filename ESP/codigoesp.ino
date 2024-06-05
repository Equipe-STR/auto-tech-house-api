#include "WiFi.h"
#include <AsyncTCP.h>
#include <Arduino_JSON.h>
#include <ArduinoWebsockets.h>

#define PIN_PRESENCA 14
#define PIN_BUZZER 17
#define PIN_FOGO 26
#define PIN_FONTE 16

const char* ssid = "STR inacio";
const char* password = "str12345";

WebsocketsClient client;
AsyncWebServer server(80);
JSONVar readings;
int ativacaoAlarme = 1;
int ativacaoIncendio = 1;

// variáveis de tempo
unsigned long lastTime = 0;
unsigned long timerDelay = 500;

String ultimoResultado = " ";

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

void notifyClients(String sensorReadings) {
  ws.textAll(sensorReadings);
}

void getSensorPresenca(){
  int sinalPresenca;
  if (ativacaoAlarme){
    sinalPresenca = digitalRead(PIN_PRESENCA);
  }
  else{
    sinalPresenca = 0;
  }
  String valorFogo = ((const char*) (readings["leituraFogo"]));
  if(sinalPresenca == HIGH){
    acionaBuzzer();
  }
  //LOW: Nada detectado
  else if (valorFogo=="0"){
    // Desativa o buzzer
    noTone(PIN_BUZZER);
  }
  readings["sinalPresenca"] = String(sinalPresenca);
  readings["ativacaoAlarme"] = String(ativacaoAlarme);  
}

void getSensorFogo(){
  bool leituraFogo;
  if (ativacaoIncendio){
    leituraFogo = digitalRead(PIN_FOGO);
  }else{
    leituraFogo = LOW;
  }
  String valorPresenca = ((const char*) (readings["sinalPresenca"]));
  if(leituraFogo==HIGH){
    acionaBuzzer();
  }
  else if (valorPresenca=="0"){
    noTone(PIN_BUZZER);
  }
  readings["leituraFogo"] =  String(leituraFogo);
  readings["ativacaoIncendio"] = String(ativacaoIncendio);
}

void getFonteUsada(){
  bool leituraFonte;
  leituraFonte = digitalRead(PIN_FONTE);
  readings["FonteUsada"] =  String(leituraFonte);
}

void configurarWifi(){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wifi....");
  }
  Serial.print("IP para conectar: ");
  Serial.println(WiFi.localIP());
}

void enviarDados(){
  String sensorReadings = JSON.stringify(readings);
  if (ultimoResultado == " "){
    Serial.println(sensorReadings);
    Serial.println("Primeira execucao");
    ultimoResultado = sensorReadings;
  }
  if (ultimoResultado != sensorReadings){
    ultimoResultado = sensorReadings;
    Serial.println(sensorReadings);
    client.send(sensorReadings)
  }
  lastTime = millis();
}

void taskGetSensorPresenca( void *pvParameters ){
  while (1){
    getSensorPresenca();
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

void taskGetSensorFogo( void *pvParameters ){
  while (1){
    getSensorFogo();
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

void taskGetFonteUsada( void *pvParameters ){
  while (1){
    getFonteUsada();
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

void criarTarefas(){
  xTaskCreatePinnedToCore(
    taskGetSensorPresenca
    ,  "Leitura presenca" // A name just for humans
    ,  1024  // Stack size
    ,  NULL //Parameters for the task
    ,  1  // Priority
    ,  NULL
    , 0); //Task Handle
    xTaskCreatePinnedToCore(
      taskGetSensorFogo
      ,  "Leitura fogo" // A name just for humans
      ,  1024  // Stack size
      ,  NULL //Parameters for the task
      ,  1  // Priority
      ,  NULL
      , 0); //Task Handle
    xTaskCreatePinnedToCore(
      taskGetFonteUsada
      ,  "Leitura fogo" // A name just for humans
      ,  1024  // Stack size
      ,  NULL //Parameters for the task
      ,  1  // Priority
      ,  NULL
      , 0); //Task Handle
}

void setup() {
//   ledcSetup(1, 2, 3);
  // Para corrigir um bug
  configureIOPin();

  Serial.begin(9600);

  configurarWifi();

  server.begin();

  criarTarefas();
}

void loop() {
  while (1){
    if ((millis() - lastTime) > timerDelay) {
      enviarDados();
    }
  }
}