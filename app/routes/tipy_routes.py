from flask import Blueprint, jsonify, request
from app.services.tipy_service import TipyService

# Vytvoření blueprintu - definujeme název a prefix pro URL
tipy_bp = Blueprint('tipy', __name__, url_prefix='/api')

@tipy_bp.route('/uzivatele', methods=['GET'])
def get_users():
    pass
