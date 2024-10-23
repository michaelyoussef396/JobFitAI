#!/usr/bin/env python3

# Standard library imports
from random import choice, randint

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Job

# Initialize Faker
fake = Faker()

# Define some predefined lists for generating random job titles, companies, and locations
job_titles = [
    "Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "Sales Executive",
    "Marketing Specialist", "Project Coordinator", "DevOps Engineer", "Mobile Developer", "Frontend Developer"
]

companies = [
    "Tech Solutions", "Innovatech", "Global Ventures", "DataDynamics", "Cloud9 Systems",
    "Bright Horizons", "RocketWeb", "NexGen Labs", "SwiftCode", "Bright Ventures"
]

locations = [
    "New York", "San Francisco", "Chicago", "Austin", "Los Angeles",
    "Seattle", "Boston", "London", "Berlin", "Melbourne"
]

# Seeding function
def seed_jobs():
    print("Seeding jobs...")

    # Delete existing job records to prevent duplicates
    Job.query.delete()

    # Create 50 fake jobs
    for _ in range(50):
        job = Job(
            title=choice(job_titles),
            company=choice(companies),
            location=choice(locations),
            description=fake.paragraph(nb_sentences=5),
            posted_at=fake.date_time_this_year()
        )
        db.session.add(job)

    # Commit to save to the database
    db.session.commit()
    print("Seeding complete!")

if __name__ == '__main__':
    with app.app_context():
        seed_jobs()
