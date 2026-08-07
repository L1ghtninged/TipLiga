from app.routes.exceptions import ValidationError
from flask import jsonify

from flask import Flask
from app.routes.admin_routes import admin_bp
from app.routes.auth_routes import auth_bp
from app.routes.tipy_routes import tipy_bp
from flask_cors import CORS
from config import Config
from flask_jwt_extended import JWTManager


jwt = JWTManager()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True
    )

    jwt.init_app(app)

    app.register_blueprint(admin_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(tipy_bp)

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