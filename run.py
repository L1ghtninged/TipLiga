
import app
from app.routes.exceptions import ValidationError
from flask import Blueprint, request, jsonify

@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify({
        "error": str(error)
    }), 400


if __name__ == "__main__":
    pass