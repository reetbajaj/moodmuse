from flask import Flask, session, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///moodmuse.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
# Journal model
class JournalEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), db.ForeignKey("user.email"), nullable=False)
    activity = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(50), default=datetime.now().strftime("%Y-%m-%d %H:%M"))

# Initialize tables
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Flask API with SQLite is running!"

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(email=email, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful!", "user": {"email": email, "name": name}}), 200

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({"message": "Login successful!", "user": {"email": user.email, "name": user.name}}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/api/journal/<email>", methods=["GET", "POST"])
def journal(email):
    if request.method == "POST":
        data = request.get_json()
        entry = JournalEntry(email=email, activity=data["activity"], content=data["content"])
        db.session.add(entry)
        db.session.commit()
        return jsonify({"message": "Entry added!", "entry": {"activity": entry.activity, "content": entry.content, "date": entry.date}}), 200

    # GET request
    entries = JournalEntry.query.filter_by(email=email).all()
    return jsonify({
        "entries": [
            {"activity": e.activity, "content": e.content, "date": e.date}
            for e in entries
        ]
    })

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()  # clears user session
    return jsonify({"message": "Logged out successfully"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5060, debug=True)
