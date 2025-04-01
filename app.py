import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

JDoodle_API_URL = 'https://api.jdoodle.com/v1/execute'
Client_ID = '7fba88e9694b46e87ac641d03a71b1e9'
Client_Secret = '486fdb6c0cf84618a7a89efed12770a6a174b6b56cc99ad9782219f969e1883b'

@app.route('/run', methods=['POST'])
def run_code():
    try:
        data = request.json
        code = data.get('code', '')
        language = data.get('language')

        payload = {
            'clientId': Client_ID,
            'clientSecret': Client_Secret,
            'script': code,
            'language': language,
        }

        # Make request to JDoodle
        response = requests.post(JDoodle_API_URL, json=payload)
        result = response.json()

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)