from app.routes.exceptions import ValidationError
from flask import jsonify

from flask import Flask
from app.routes.admin_routes import admin_bp
from app.routes.auth_routes import auth_bp

def create_app():
    app = Flask(__name__)

    

    app.register_blueprint(admin_bp)

    return app

app = create_app()

@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify({
        "error": str(error)
    }), 400
@app.errorhandler(ValueError)
def handle_validation_error(error):
    return jsonify({
        "error": str(error)
    }), 400

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the API!"}), 200
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )