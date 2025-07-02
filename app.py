import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

APP_TITLE = os.getenv("APP_TITLE", "🎯 Rat of Fortune")
BASE_PATH = os.getenv("APP_BASE_PATH", "/").rstrip("/")
BASE_PATH = BASE_PATH if BASE_PATH else "/"

STATIC_FOLDER = os.path.join(os.path.dirname(__file__), "static")
TEMPLATE_FOLDER = os.path.join(os.path.dirname(__file__), "templates")

app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder=TEMPLATE_FOLDER)

@app.route("/")
def index():
    names = []
    if os.path.exists("names.txt"):
        with open("names.txt") as f:
            names = [line.strip() for line in f if line.strip()]
    return render_template("index.html", names=names, app_title=APP_TITLE)

@app.route("/spin", methods=["POST"])
def spin():
    names = request.get_json().get("names", [])
    return jsonify({"names": names})

@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(STATIC_FOLDER, filename)

mount_paths = [BASE_PATH]
if BASE_PATH != "/":
    mount_paths.append("/")

application = DispatcherMiddleware(Flask("dummy_root"), {
    path: app for path in mount_paths
})

if __name__ == "__main__":
    run_simple("0.0.0.0", 5000, application, use_reloader=True)
