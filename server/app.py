#!/usr/bin/env python3

# Standard library imports
from datetime import datetime  # Import datetime

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from models import User, Skill, Job, Application, Experience

# Local imports
from config import app, db, api

# User Signup
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

# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User does not exist!"}), 400

    # Check password
    if not user.check_password(password):
        return jsonify({"message": "Invalid password!"}), 400

    return jsonify({"message": "Login successful!", "user": {"name": user.name, "email": user.email}}), 200

# Get User Profile
@app.route('/profile', methods=['GET'])
def get_profile():
    email = request.args.get('email')  # Get user email from query params
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({"user": {"name": user.name, "email": user.email}})

# Get User Skills
@app.route('/skills', methods=['GET'])
def get_skills():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    skills = [skill.name for skill in user.skills]  # Assuming User has a relationship with Skill model
    return jsonify({"skills": skills})

# Add a New Skill
@app.route('/skills', methods=['POST'])
def add_skill():
    data = request.get_json()
    email = data.get('email')
    skill_name = data.get('skill')

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if the skill already exists
    skill = Skill.query.filter_by(name=skill_name).first()

    # If skill doesn't exist, create a new one
    if not skill:
        skill = Skill(name=skill_name)
        db.session.add(skill)
    
    # Add the skill to the user's skill set if not already added
    if skill not in user.skills:
        user.skills.append(skill)
        db.session.commit()

    return jsonify({"message": f"Skill '{skill_name}' added successfully!"}), 201

# Get User Experiences
@app.route('/experiences', methods=['GET'])
def get_experiences():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    experiences = [exp.to_dict() for exp in user.experiences]
    return jsonify({"experiences": experiences})

# Add a New Experience
@app.route('/experiences', methods=['POST'])
def add_experience():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Convert date strings to datetime objects
    start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date() if data['startDate'] else None
    end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date() if data['endDate'] else None

    new_exp = Experience(
        title=data['title'],
        company=data['company'],
        start_date=start_date,
        end_date=end_date,
        user=user
    )
    
    db.session.add(new_exp)
    db.session.commit()
    return jsonify(new_exp.to_dict()), 201

# Update an Experience
@app.route('/experiences/<int:id>', methods=['PUT'])
def update_experience(id):
    data = request.get_json()
    exp = Experience.query.get(id)
    if not exp:
        return jsonify({"message": "Experience not found"}), 404

    # Convert date strings to datetime objects
    exp.start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date() if data['startDate'] else None
    exp.end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date() if data['endDate'] else None

    exp.title = data['title']
    exp.company = data['company']
    db.session.commit()
    return jsonify(exp.to_dict()), 200

# Delete an Experience
@app.route('/experiences/<int:id>', methods=['DELETE'])
def delete_experience(id):
    exp = Experience.query.get(id)
    if not exp:
        return jsonify({"message": "Experience not found"}), 404

    db.session.delete(exp)
    db.session.commit()
    return jsonify({"message": "Experience deleted"}), 200

# Index Route
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Run the Flask App
if __name__ == '__main__':
    app.run(port=5555, debug=True)
