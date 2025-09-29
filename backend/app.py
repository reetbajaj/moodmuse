from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow cross-origin requests from React frontend

# Temporary in-memory storage
users = []

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    
    # Check if user already exists
    for user in users:
        if user['email'] == email:
            return jsonify({"message": "User already exists"}), 400

    users.append(data)
    return jsonify({"message": "Signup successful!", "user": data}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Find user
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    if user:
        return jsonify({"message": "Login successful!", "user": user}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

