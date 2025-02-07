from flask import Blueprint, request, jsonify
from . import db, bcrypt
from .models import User, Expense
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api_bp = Blueprint('api', __name__)

# Test Route
@api_bp.route('/test', methods=['GET'])
def test():
    return {'message': 'API is working'}, 200


# User Registration
@api_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not all(k in data for k in ('first_name', 'last_name', 'email', 'password')):
        return jsonify({'error': 'Missing data'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


# User Login
@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity=str(user.id))  # Convert user.id to string
        return jsonify({'access_token': access_token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401


# Add Expense
@api_bp.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    user_id = int(get_jwt_identity())  # Convert back to integer
    data = request.get_json()

    if not all(k in data for k in ('amount', 'date', 'description')):
        return jsonify({'error': 'Amount, Date and Description  are required'}), 400

    expense = Expense(amount=data['amount'], date=data['date'], description=data['description'], user_id=user_id)
    db.session.add(expense)
    db.session.commit()

    return jsonify({'message': 'Expense added successfully'}), 201

# Get Expenses
@api_bp.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = int(get_jwt_identity())  # Convert back to integer
    expenses = Expense.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            'id': e.id,
            'amount': e.amount,
            'date': e.date , 
            'description':e.description,
        }
        for e in expenses
    ]), 200
@api_bp.route('/expenses/<int:expense_id>', methods=['PUT'])
@jwt_required()
def update_expense(expense_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()

    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404

    if 'amount' in data:
        expense.amount = data['amount']
    if 'date' in data:
        expense.date = data['date']

    db.session.commit()

    return jsonify({'message': 'Expense updated successfully'}), 200


# Delete Expense
@api_bp.route('/expenses/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    user_id = int(get_jwt_identity())
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()

    if not expense:
        return jsonify({'error': 'Expense not found'}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({'message': 'Expense deleted successfully'}), 200