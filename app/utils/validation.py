from flask import request
from app.routes.exceptions import ValidationError
def get_json_data():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        raise ValidationError("Request body must be a JSON object.")

    return data
def is_non_negative_int(value : int):
        if isinstance(value, bool) or not isinstance(value, int) or value < 0:
            return False
        
        return True
def is_positive_int(value : int):
        if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
            return False
        
        return True