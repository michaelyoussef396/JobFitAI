#!/usr/bin/env python3

# Standard library imports
from datetime import datetime
import os
from dotenv import load_dotenv

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from models import User, Skill, Job, Application, Experience

# Load environment variables from .env file
load_dotenv()

# Local imports
from config import app, db

# User Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    bio = data.get('bio')  # New bio field
    location = data.get('location')  # New location field
    website = data.get('website')  # New website field

    # Check if the user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "User already exists!"}), 400

    # Create a new user
    new_user = User(name=name, email=email, bio=bio, location=location, website=website)
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
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    profile_data = {
        "bio": user.bio,
        "location": user.location,
        "website": user.website,
        "email": user.email,
        "name": user.name,
        "desired_job_title": user.desired_job_title  # Include desired job title
    }
    
    return jsonify(profile_data), 200

@app.route('/profile', methods=['PUT'])
def update_profile():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # Update the fields with new values
    user.bio = data.get('bio', user.bio)
    user.location = data.get('location', user.location)
    user.website = data.get('website', user.website)
    user.desired_job_title = data.get('desired_job_title', user.desired_job_title)  # Update desired job title
    
    db.session.commit()
    
    return jsonify({"message": "Profile updated successfully!"}), 200

# Get User Skills
@app.route('/skills', methods=['GET'])
def get_skills():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    skills = [{'id': skill.id, 'name': skill.name} for skill in user.skills]  # Return skill ID and name
    return jsonify({"skills": skills})

@app.route('/experiences', methods=['GET'])
def get_experiences():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    experiences = [exp.to_dict() for exp in user.experiences]  # Make sure experiences are returned correctly
    return jsonify({"experiences": experiences})

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

    return jsonify({"id": skill.id, "name": skill_name}), 201  # Return the newly added skill's ID and name

# Update a Skill
@app.route('/skills/<int:id>', methods=['PUT'])
def update_skill(id):
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    skill = Skill.query.get(id)
    if not skill:
        return jsonify({"message": "Skill not found"}), 404

    # Update the skill's name
    skill.name = data['skill']
    db.session.commit()
    return jsonify({"message": f"Skill '{skill.name}' updated successfully!"}), 200

# Delete a Skill
@app.route('/skills/<int:id>', methods=['DELETE'])
def delete_skill(id):
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    skill = Skill.query.get(id)
    if not skill:
        return jsonify({"message": "Skill not found"}), 404

    # Remove the skill from the user's skill set
    if skill in user.skills:
        user.skills.remove(skill)
        db.session.commit()

    return jsonify({"message": f"Skill '{skill.name}' removed successfully!"}), 200

# Save Job
@app.route('/save-job', methods=['POST'])
def save_job():
    data = request.get_json()
    email = data.get('email')
    job = data.get('job')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if the job already exists in the database to avoid duplicates
    existing_job = Job.query.filter_by(id=job['id']).first()
    if not existing_job:
        # Assuming the Job model contains these fields
        saved_job = Job(
            id=job['id'],  # Make sure your Job model has this 'id' field
            title=job['title'],
            company=job['company'],
            location=job['location'],
            description=job.get('description', ''),  # Optional description field
        )
        db.session.add(saved_job)
        db.session.commit()

    # Add the job to the user's saved jobs
    if existing_job not in user.saved_jobs:
        user.saved_jobs.append(existing_job or saved_job)
        db.session.commit()

    return jsonify({"message": "Job saved successfully"}), 201

# Fetch saved jobs
@app.route('/saved-jobs', methods=['GET'])
def get_saved_jobs():
    email = request.args.get('email')
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    saved_jobs = [job.to_dict() for job in user.saved_jobs]
    return jsonify({"saved_jobs": saved_jobs}), 200

# Fetch Job Listings from Database (fake jobs)
@app.route('/job-listings', methods=['GET'])
def get_job_listings():
    try:
        # Fetch all jobs from the database
        jobs = Job.query.all()
        
        # Format the jobs to be returned as JSON
        job_list = [
            {
                'id': job.id,
                'title': job.title,
                'company': job.company,
                'location': job.location,
                'description': job.description
            } 
            for job in jobs
        ]
        
        return jsonify(job_list), 200
    except Exception as e:
        return jsonify({"error": "Failed to fetch job listings"}), 500

# Fetch Job Details
@app.route('/job/<int:job_id>', methods=['GET'])
def get_job_details(job_id):
    try:
        job = Job.query.get(job_id)
        if not job:
            return jsonify({"error": "Job not found"}), 404
        
        job_details = {
            'id': job.id,
            'title': job.title,
            'company': job.company or 'Company not provided',
            'location': job.location or 'Location not provided',
            'salary_min': job.salary_min if job.salary_min else 'Not available',  # Handle missing salary
            'salary_max': job.salary_max if job.salary_max else '',
            'description': job.description if job.description else 'No description available'
        }

        return jsonify(job_details), 200
    except Exception as e:
        print(f"Error fetching job details: {e}")
        return jsonify({"error": "Failed to fetch job details"}), 500
# Index Route
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Run the Flask App
if __name__ == '__main__':
    app.run(port=5555, debug=True)
