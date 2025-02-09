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

    new_user = User.create_user(data['first_name'], data['last_name'], data['email'], data['password'])

    return jsonify({'message': 'User registered successfully', 'user_id': new_user.id}), 201



# User Login
@api_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.find_by_email(data.get('email'))

    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'access_token': access_token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401



# Add Expense
@api_bp.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    user_id = int(get_jwt_identity())  # Convert back to integer
    data = request.get_json()

    if not all(k in data for k in ('amount', 'date', 'description')):
        return jsonify({'error': 'Amount, Date and Description are required'}), 400

    new_expense = Expense.add_expense(user_id, data['amount'], data['date'], data['description'])

    return jsonify({'message': 'Expense added successfully', 'expense_id': new_expense.id}), 201




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
    if 'description' in data:
        expense.description=data['description']    

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


# Reset Password
@api_bp.route('/reset-password', methods=['PUT'])
def update_password():
    data = request.get_json()
    if not all(k in data for k in ('email', 'new_password')):
        return jsonify({'error': 'Email and new password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    hashed_password = bcrypt.generate_password_hash(data['new_password']).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({'message': 'Password updated successfully'}), 200