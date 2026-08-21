from flask import jsonify, request
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.extensions.limiter import limiter

from app.routes.exceptions import ValidationError
from app.routes.admin_routes import admin_bp
from app.routes.auth_routes import auth_bp
from app.routes.tipy_routes import tipy_bp
from config import Config
from app.utils.logging_config import setup_logging
jwt = JWTManager()




def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)
    setup_logging(app)
    CORS(
        app,
        resources={r"/api/*": {"origins": Config.FRONTEND_ORIGIN}},
        supports_credentials=True
    )

    jwt.init_app(app)
    limiter.init_app(app)

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
def handle_value_error(error):
    return jsonify({
        "error": str(error)
    }), 400
@app.errorhandler(429)
def handle_rate_limit(error):

    app.logger.warning(
        "Rate limit exceeded: IP=%s, path=%s, method=%s",
        request.remote_addr,
        request.path,
        request.method
    )

    return jsonify({
        "error": "Příliš mnoho požadavků. Zkuste to později."
    }), 429
@app.route('/')
def index():
    return jsonify({"message": "Welcome to the API!"}), 200
@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

    return response
@jwt.expired_token_loader
def expired(jwt_header, jwt_payload):
    return jsonify({"message": "Token vypršel."}), 401


@jwt.unauthorized_loader
def missing(reason):
    return jsonify({"message": "Chybí autorizační token."}), 401


@jwt.invalid_token_loader
def invalid(reason):
    return jsonify({"message": "Neplatný token."}), 401

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )