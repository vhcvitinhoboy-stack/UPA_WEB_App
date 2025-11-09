import os
import json
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Get the directory where app.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data.json')

# Load data from data.json
def load_locations_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

locations_data = load_locations_data()

@app.route('/api/locations', methods=['GET'])
def get_locations():
    return jsonify(locations_data)

@app.route('/')
def home():
    return "Backend is running. Access /api/locations for data."

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
