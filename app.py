import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
NAMES_FILE = "names.txt"
APP_TITLE = os.getenv("APP_TITLE", "🎯 Rat of Fortune")

def load_names():
    if not os.path.exists(NAMES_FILE):
        return []
    with open(NAMES_FILE) as f:
        return [line.strip() for line in f if line.strip()]

@app.route("/")
def index():
    names = load_names()
    return render_template("index.html", names=names, app_title=APP_TITLE)

@app.route("/spin", methods=["POST"])
def spin():
    data = request.get_json()
    names = data.get("names", [])
    if not names:
        return jsonify({"error": "No names selected"}), 400
    return jsonify({"names": names})  # winner selected client-side

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
