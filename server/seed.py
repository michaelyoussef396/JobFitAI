#!/usr/bin/env python3

from app import db, app  # Assuming your app instance is created in app.py
from models import Job
from faker import Faker

def seed_jobs():
    with app.app_context():  # Push the app context
        db.drop_all()  # Clears the database
        db.create_all()  # Recreates the tables

        fake = Faker()
        job_types = ["Full-time", "Part-time", "Casual", "Remote", "Hybrid"]
        job_titles = ["Mobile Developer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "Data Scientist", "Product Manager", "Marketing Specialist", "Sales Executive", "UX Designer"]

        jobs = []

        for _ in range(30, 51):  # Generate between 30 and 50 jobs
            job = Job(
                title=fake.random.choice(job_titles),
                company=fake.company(),
                location=fake.city(),
                job_type=f"{fake.random.choice(job_types)}, {fake.random.choice(job_types)}",
                salary_min=round(fake.random_number(digits=5)),
                salary_max=round(fake.random_number(digits=5)) + 20000,
                description=fake.paragraph(nb_sentences=3),
                why_choose_us=fake.sentence(),
                role_responsibilities=fake.paragraph(nb_sentences=2),
                benefits=fake.sentence(),
                about_you=fake.sentence(),
                about_company=fake.paragraph(nb_sentences=3),
                employer_questions=f"Do you have experience in {fake.bs()}? Are you eligible to work in {fake.country()}?"
            )
            jobs.append(job)

        db.session.bulk_save_objects(jobs)
        db.session.commit()
        print("Seeding complete!")

if __name__ == '__main__':
    seed_jobs()
