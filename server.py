from flask import Flask, jsonify
import serial
import time


app = Flask(__name__)

# Arduino와의 시리얼 연결 설정
ser = serial.Serial('COM3', 9600)  # 실제 포트와 보율을 확인하세요
time.sleep(2)  # 시리얼 포트가 안정화될 때까지 대기

@app.route('/update_bpm', methods=['GET'])
def update_bpm():
    if ser.in_waiting > 0:
        try:
            line = ser.readline().decode('utf-8').strip()
            bpm = int(line)
            status = "Normal" if 60 <= bpm <= 100 else "Abnormal"
            return jsonify({'bpm': bpm, 'status': status})
        except ValueError:
            return jsonify({'bpm': 0, 'status': 'Invalid Data'})
    return jsonify({'bpm': 0, 'status': 'No Data'})

if __name__ == '__main__':
    app.run(debug=True)
