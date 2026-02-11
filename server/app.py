from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS so your React frontend (usually on port 5173) can access this API
CORS(app)

@app.route('/')
def home():
    return "Talalink Backend is Running!"

@app.route('/api/test', methods=['GET'])
def test_connection():
    """Route to verify the frontend-backend connection."""
    return jsonify({
        "status": "success",
        "message": "Backend reached! Connection to Talalink API is active.",
        "location_origin": "Thika, Kenya"
    })

if __name__ == '__main__':
    # Running on port 5000 by default
    app.run(debug=True, port=5000)