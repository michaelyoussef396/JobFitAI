#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from models import User
# Local imports
from config import app, db, api
# Add your model imports
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists!"}), 400

    # Create a new user
    new_user = User(name=name, email=email)
    new_user.set_password(password)  # Hash the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully!"}), 201

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)