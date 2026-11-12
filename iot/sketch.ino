#include <WiFi.h>
#include <HTTPClient.h>
#include <DHTesp.h>

const int DHT_PIN = 15, LED_PIN = 18, BUZZER_PIN = 19;
const char* SSID = "Wokwi-GUEST";
const char* PASSWORD = "";
const char* API_URL = "http://host.wokwi.internal:5080/api/v1/readings";
DHTesp dht;

void setup() {
  Serial.begin(115200); dht.setup(DHT_PIN, DHTesp::DHT22);
  pinMode(LED_PIN, OUTPUT); pinMode(BUZZER_PIN, OUTPUT);
  WiFi.begin(SSID, PASSWORD, 6);
  while (WiFi.status() != WL_CONNECTED) { delay(250); Serial.print('.'); }
  Serial.println(" conectado");
}

void loop() {
  TempAndHumidity value = dht.getTempAndHumidity();
  bool danger = value.temperature >= 35 || (value.temperature >= 32 && value.humidity >= 60);
  digitalWrite(LED_PIN, danger); if (danger) tone(BUZZER_PIN, 880, 250);
  Serial.printf("Temperatura %.1f C | Umidade %.1f %% | risco %s\n", value.temperature, value.humidity, danger ? "alto" : "normal");
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http; http.begin(API_URL); http.addHeader("Content-Type", "application/json");
    String json = "{\"temperatureC\":" + String(value.temperature, 1) + ",\"humidityPercent\":" + String(value.humidity, 1) + ",\"source\":\"wokwi-esp32-01\",\"neighborhood\":\"Bela Vista\"}";
    int status = http.POST(json); Serial.printf("API HTTP %d\n", status); http.end();
  }
  delay(10000);
}
