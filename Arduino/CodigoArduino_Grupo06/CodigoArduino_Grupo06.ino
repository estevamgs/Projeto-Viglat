// Importando Bibliotecas Necessárias, certifique-se de que estão instaladas, o nome é DHT11 Library

#include <DHT.h>
#include <DHT_U.h>

// Definir variáveis

#define TIPO_SENSOR DHT11
const int PINO_SENSOR_DHT11 = A0;

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);

// Fazer a inicialização do código, configurar a frequência com que o sensor vai mandar info para o código 

void setup() {
  Serial.begin(9600);
  sensorDHT.begin();
}

// O código que será rodado e repetido mandando informação para o console

void loop() {
  float umidade = sensorDHT.readHumidity();
  float temperatura = sensorDHT.readTemperature();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler os dados do sensor");
  } else {
    Serial.print(umidade);
    Serial.print(";");
    Serial.println(temperatura);
  }
  delay(1000);
}










