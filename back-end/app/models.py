from datetime import datetime
from . import db, bcrypt


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    expenses = db.relationship('Expense', backref='user', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp when user is created

    @classmethod
    def create_user(cls, first_name, last_name, email, password):
        """Create and save a new user."""
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = cls(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @classmethod
    def find_by_email(cls, email):
        """Find a user by email."""
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_id(cls, user_id):
        """Find a user by ID."""
        return cls.query.get(user_id)
    
    

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(200), nullable=False)

    @classmethod
    def add_expense(cls, user_id, amount, date, description):
        """Create and save a new expense."""
        new_expense = cls(user_id=user_id, amount=amount, date=date, description=description)
        db.session.add(new_expense)
        db.session.commit()
        return new_expense