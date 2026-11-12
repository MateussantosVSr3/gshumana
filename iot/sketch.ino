#include <WiFi.h>
#include <HTTPClient.h>
#include <DHTesp.h>

const int DHT_PIN = 15;
const int LED_PIN = 18;
const int BUZZER_PIN = 19;
const char* API_URL = "http://host.wokwi.internal:5080/api/v1/readings";

DHTesp dht;
unsigned long lastPost = 0;

void setup() {
  Serial.begin(115200);
  dht.setup(DHT_PIN, DHTesp::DHT22);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  // Autoteste dos atuadores ao iniciar.
  digitalWrite(LED_PIN, HIGH);
  tone(BUZZER_PIN, 1000);
  delay(1000);
  noTone(BUZZER_PIN);
  digitalWrite(LED_PIN, LOW);

  // O sensor continua funcionando mesmo se a API estiver indisponível.
  WiFi.begin("Wokwi-GUEST", "", 6);
}

void loop() {
  TempAndHumidity value = dht.getTempAndHumidity();

  if (isnan(value.temperature) || isnan(value.humidity)) {
    Serial.println("Falha ao ler DHT22");
    delay(1000);
    return;
  }

  bool danger = value.temperature >= 35 ||
                (value.temperature >= 32 && value.humidity >= 60);

  digitalWrite(LED_PIN, danger ? HIGH : LOW);
  if (danger) {
    tone(BUZZER_PIN, 880);
  } else {
    noTone(BUZZER_PIN);
  }

  Serial.printf(
      "Temperatura: %.1f C | Umidade: %.1f %% | Risco: %s\n",
      value.temperature,
      value.humidity,
      danger ? "ALTO" : "NORMAL");

  if (millis() - lastPost >= 10000 && WiFi.status() == WL_CONNECTED) {
    lastPost = millis();
    HTTPClient http;
    http.begin(API_URL);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"temperatureC\":" + String(value.temperature, 1) +
                  ",\"humidityPercent\":" + String(value.humidity, 1) +
                  ",\"source\":\"wokwi-esp32-01\"" +
                  ",\"neighborhood\":\"Bela Vista\"}";

    Serial.printf("API HTTP: %d\n", http.POST(json));
    http.end();
  }

  delay(500);
}
