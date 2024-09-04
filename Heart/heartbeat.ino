const int sensorPin = A0;                // 심박수 센서 핀
const int threshold = 520;               // 피크 감지 임계값 (센서에 따라 조정 필요)
const int numReadings = 27;              // 3초 동안 0.11초마다 측정하므로 3 / 0.11 ≈ 27

int readings[numReadings];               // 데이터를 저장할 배열
int index = 0;                           // 현재 배열 인덱스
unsigned long startTime = 0;             // 측정 시작 시간
unsigned long lastMeasurementTime = 0;   // 마지막 측정 시간
const unsigned long measurementInterval = 3000; // 3초
const unsigned long intervalBetweenMeasurements = 110; // 0.11초

int beatCount = 0;                      // 심박수 측정 카운트
bool inPeak = false;                    // 피크 감지 상태

void setup() {
  Serial.begin(9600);                  // 시리얼 통신 초기화 (HC-05와 통신)
  
  // 배열 초기화
  for (int i = 0; i < numReadings; i++) {
    readings[i] = 0;
  }

  startTime = millis();                // 측정 시작 시간 기록
  lastMeasurementTime = startTime;     // 마지막 측정 시간 초기화
}

void loop() {
  unsigned long currentTime = millis(); // 현재 시간 갱신

  // 0.11초마다 데이터 읽기
  if (currentTime - lastMeasurementTime >= intervalBetweenMeasurements) {
    int sensorValue = analogRead(sensorPin);  // 센서 값 읽기
    
    // 데이터 저장
    readings[index] = sensorValue;
    index = (index + 1) % numReadings; // 인덱스 업데이트
    
    // 피크 감지 및 심박수 계산
    if (sensorValue > threshold && !inPeak) {
      inPeak = true;
      beatCount++;  // 심박수 카운트 증가
    }
    if (sensorValue < threshold && inPeak) {
      inPeak = false;
    }

    lastMeasurementTime = currentTime; // 마지막 측정 시간 갱신
  }

  // 3초 동안 측정 후 평균 계산 및 결과 출력
  if (currentTime - startTime >= measurementInterval) {
    int bpm = beatCount * 20;  // 3초 동안의 심박수를 분당 심박수(BPM)로 변환 (3초 -> 60초)

    // 유효 범위 체크
    if (bpm < 40 || bpm > 220) {
      Serial.println("Please recalibrate the sensor.");
    } else {
      // 평균 BPM을 블루투스를 통해 전송
      Serial.print("Average BPM over 3 seconds: ");
      Serial.println(bpm, 1); // 소수점 1자리까지 표시
    }

    // 측정 리셋
    startTime = millis();     // 시작 시간 리셋
    index = 0;               // 배열 인덱스 리셋
    beatCount = 0;           // 심박수 카운트 리셋
  }

  delay(1);  // 데이터 과부하 방지를 위한 약간의 지연
}
