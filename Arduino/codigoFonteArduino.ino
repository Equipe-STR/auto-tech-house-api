#include <Arduino_FreeRTOS.h>

// Definições para o controle de luzes
#define LIGHT 13
#define SENSOR 2 // Sensor presença principal (Escada)
#define LED 10
#define LDR A3
#define LIGHT2 11 // Sensor presença secundário (Sala)
#define SENSOR2 3


// Variáveis globais
int val = 0, lastVal = 0, valorldr = 0, val2 = 0, lastVal2 = 0, posicaoAtual;
unsigned long timer = 0, timer2 = 0, previousMillis = 0;
const long interval = 1000; // Intervalo de tempo para alternar entre as tarefas (1 segundo)


void setup() {
  pinMode(LIGHT, OUTPUT);
  pinMode(SENSOR, INPUT);
  pinMode(LED, OUTPUT);
  pinMode(LDR, INPUT);
  pinMode(LIGHT2, OUTPUT);
  pinMode(SENSOR2, INPUT);
  Serial.begin(9600);

  xTaskCreate(TaskHandleSensor1, "HandleSensor1", 128, NULL, 4, NULL);
  xTaskCreate(TaskHandleLdr, "HandleLdr", 128, NULL, 4, NULL);
  xTaskCreate(TaskHandleSensor2, "HandleSensor2", 128, NULL, 4, NULL);
}

void loop() {
  // Não é necessário mais nada no loop principal quando se usa o FreeRTOS
}

void TaskHandleSensor1(void *pvParameters) {
  (void) pvParameters;
  for (;;) {
    handleSensor(readSensor(&val, &lastVal, SENSOR), LIGHT, &timer, "\n Sensor de Presença 1:");
    vTaskDelay(100 / portTICK_PERIOD_MS); // Delay de 1 segundo
  }
}

void TaskHandleLdr(void *pvParameters) {
  (void) pvParameters;
  for (;;) {
    valorldr = readLdr(LDR);
    handleLdr(valorldr, LED, "\n Sensor de Luz externa:");
    vTaskDelay(1000 / portTICK_PERIOD_MS); // Delay de 1 segundo
  }
}

void TaskHandleSensor2(void *pvParameters) {
  (void) pvParameters;
  for (;;) {
    handleSensor2(readSensor(&val2, &lastVal2, SENSOR2), LIGHT2, &timer2, LED, valorldr);
    vTaskDelay(100 / portTICK_PERIOD_MS); // Delay de 1 segundo
  }
}


int readSensor(int* val, int* lastVal, int sensorPin) {
  *val = digitalRead(sensorPin);
  return *val;
}

void handleSensor(int val, int lightPin, unsigned long* timer, const char* sensorName) {
  Serial.println(sensorName);
  if(val == HIGH){
    digitalWrite(lightPin, HIGH);
    *timer = millis();
    Serial.println("Pessoas na área !!");
  }
  
  if(val == LOW && millis() - *timer < 5000){
    digitalWrite(lightPin, HIGH);
    //Serial.println("Mantendo a luz acesa por mais 5 segundos...");
  }
  
  if(val == LOW && millis() - *timer >= 5000){
    digitalWrite(lightPin, LOW);
    Serial.println("Sem pessoas na área !!");
  }
}

int readLdr(int ldrPin) {
  int valorldr = analogRead(ldrPin);
  return valorldr;
}

void handleLdr(int valorldr, int ledPin, const char* sensorName) {
  Serial.println(sensorName);
  digitalWrite(ledPin, valorldr < 250 ? HIGH : LOW);
}

void handleSensor2(int val2, int light2Pin, unsigned long* timer2, int ledPin, int valorldr) {
  Serial.println("\n Sensor de Presença 2:");
  if(val2 == HIGH && digitalRead(ledPin) == LOW){
    digitalWrite(light2Pin, HIGH);
    *timer2 = millis();
    Serial.println("Ligando Luz 2 !!");
  }
  
  if(val2 == LOW && millis() - *timer2 < 8000 && digitalRead(ledPin) == LOW){
    digitalWrite(light2Pin, HIGH);
    //Serial.println("Mantendo a luz 2 acesa por mais 5 segundos...");
  }
  
  if(val2 == LOW && millis() - *timer2 >= 8000 && digitalRead(ledPin) == LOW){
    digitalWrite(light2Pin, LOW);
    Serial.println("Desligando Luz 2 !!");
  }

  if(digitalRead(ledPin) == HIGH){
    digitalWrite(light2Pin, HIGH);
    Serial.println("Ligando Luz 2 porque a luz externa está ligada !!");
  }
}
