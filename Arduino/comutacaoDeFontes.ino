const int pinoRele = 2;
const int pinoMonitor = 3;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(pinoRele, OUTPUT);
  pinMode(pinoMonitor, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(A5);
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  float voltage = sensorValue * (5 / 1023.0);
  // print out the value you read:
  // Serial.println(voltage);   
  
  if(voltage < 3){
    digitalWrite(pinoRele, LOW);
    digitalWrite(pinoMonitor, LOW);
  }
  else{
    digitalWrite(pinoRele, HIGH);
    digitalWrite(pinoMonitor, HIGH);
  }
}
