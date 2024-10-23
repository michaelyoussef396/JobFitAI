from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from config import db

# Many-to-Many association table for User and Skill
user_skills = db.Table('user_skills',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('skills.id'), primary_key=True)
)

# Many-to-Many association table for saved jobs
saved_jobs = db.Table('saved_jobs',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('job_id', db.Integer, db.ForeignKey('jobs.id'), primary_key=True)
)

# Skill Model
class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    # Back reference to users
    users = relationship('User', secondary=user_skills, back_populates='skills')

# Job Model
class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    company = db.Column(db.String)
    location = db.Column(db.String)
    description = db.Column(db.Text)
    salary_min = db.Column(db.Integer)  # Ensure these fields are present
    salary_max = db.Column(db.Integer)  # Ensure these fields are present

    # Relationship with users for saved jobs
    users = relationship('User', secondary=saved_jobs, back_populates='saved_jobs')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "company": self.company,
            "location": self.location,
            "description": self.description,
            "posted_at": self.posted_at.strftime('%Y-%m-%d')
        }

# Application Model
class Application(db.Model):
    __tablename__ = 'applications'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False, default='applied')
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))
    job = relationship('Job')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = relationship('User', back_populates='applications')

# Experience Model
class Experience(db.Model):
    __tablename__ = 'experiences'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    # Relationship to User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = relationship('User', back_populates='experiences')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'startDate': self.start_date.strftime('%Y-%m-%d') if self.start_date else None,
            'endDate': self.end_date.strftime('%Y-%m-%d') if self.end_date else None
        }

# User Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Other fields
    bio = db.Column(db.Text)
    location = db.Column(db.String(100))
    website = db.Column(db.String(120))
    desired_job_title = db.Column(db.String(100))

    # Relationships
    skills = relationship('Skill', secondary=user_skills, back_populates='users')
    experiences = relationship('Experience', back_populates='user')
    applications = relationship('Application', back_populates='user')  # One-to-Many with Application
    saved_jobs = relationship('Job', secondary=saved_jobs, back_populates='users')  # Many-to-Many with Job

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
