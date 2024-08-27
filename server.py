from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_bpm', methods=['POST'])
def update_bpm():
    data = request.json
    bpm = data.get('bpm')
    status = 'Normal' if bpm and bpm >= 60 and bpm <= 100 else 'Abnormal'
    return jsonify({'bpm': bpm, 'status': status})

if __name__ == '__main__':
    app.run(debug=True)
