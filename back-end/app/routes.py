from flask import Blueprint, request, jsonify
from . import db, bcrypt
from .models import User, Expense
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api_bp = Blueprint('api', __name__)

# Test Route
@api_bp.route('/test', methods=['GET'])
def test():
    return {'message': 'API is working'}, 200

