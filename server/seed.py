#!/usr/bin/env python3

from app import db, app  
from models import Job
from datetime import datetime

def seed_jobs():
    with app.app_context():  # Push the app context
        # Step 1: Delete all current job listings
        db.session.query(Job).delete()
        db.session.commit()
        print("Deleted all current job listings.")

        # Step 2: Add the 10 provided real job listings
        jobs = [
            Job(
                title="Graduate Software Developer",
                company="Buildsoft Pty Ltd",
                location="Campbelltown, Sydney NSW",
                job_type="Full-time",
                salary_min=80000,
                salary_max=80000,
                description="Looking for a Graduate developer to join our team working on Cubit Select with .NET, Angular & AWS.",
                why_choose_us="Great flexibility and hybrid work options.",
                role_responsibilities="Write, test, and debug software; refactor code; participate in design reviews.",
                benefits="Hybrid work options",
                about_you="Bachelor’s degree in computer science or engineering required.",
                about_company="Buildsoft is a market leader in construction estimating and takeoff software.",
                employer_questions="Do you have experience in .NET, Angular? Are you eligible to work in Australia?"
            ),
            Job(
                title="Applications Developer",
                company="Charles Darwin University",
                location="Darwin NT",
                job_type="Full-time",
                salary_min=93475,
                salary_max=102606,
                description="Develop applications within the student management system at CDU.",
                why_choose_us="An employer who values your contribution.",
                role_responsibilities="Develop, test, and maintain applications; collaborate with teams.",
                benefits="6 weeks annual leave, 17% superannuation.",
                about_you="Bachelor’s degree in computer science or related field, experience with Java, C, Python.",
                about_company="CDU is a vibrant institution focusing on education, training, and research in the Asia-Pacific region.",
                employer_questions="Do you have experience in Java, Python? Are you eligible to work in Australia?"
            ),
            Job(
                title="In-house Junior Web Developer",
                company="Jade Finance Australia",
                location="Varsity Lakes, Gold Coast QLD",
                job_type="Full-time",
                salary_min=50000,
                salary_max=70000,
                description="Maintain and customize WordPress themes, work on company websites.",
                why_choose_us="Work on impactful projects in a growing company.",
                role_responsibilities="Design, develop, and maintain websites; troubleshoot issues.",
                benefits="Professional development opportunities, collaborative environment.",
                about_you="Experience in WordPress, HTML, CSS, JavaScript, PHP.",
                about_company="Jade Finance is a leading player in the Australian finance sector.",
                employer_questions="Which programming languages are you experienced in? Right to work in Australia?"
            ),
            Job(
                title="Frontend Engineer (Mid-Level) – React",
                company="Evolution Recruitment Solutions Pty Ltd",
                location="Melbourne VIC",
                job_type="Full-time",
                salary_min=110000,
                salary_max=120000,
                description="Develop responsive applications using React, collaborate with product teams.",
                why_choose_us="Competitive salary, flexible working hours.",
                role_responsibilities="Build and maintain React components, optimize performance.",
                benefits="Professional growth, inclusive culture.",
                about_you="4+ years of experience with React, proficiency in HTML, CSS, JavaScript.",
                about_company="Evolution Recruitment is a leader in tech recruitment in Australia.",
                employer_questions="Do you have React experience? Right to work in Australia?"
            ),
            Job(
                title="Software Engineer",
                company="Splend Pty Ltd",
                location="Sydney NSW",
                job_type="Full-time",
                salary_min=100000,
                salary_max=120000,
                description="Develop and scale tools for the company's vehicle ownership platform.",
                why_choose_us="Performance bonuses, Employee Assistance Program.",
                role_responsibilities="Develop and maintain backend services, build scalable tools.",
                benefits="Learning & Development Platform, inclusive culture.",
                about_you="3+ years of experience with Python, backend services experience.",
                about_company="Splend is focused on making vehicle ownership accessible and sustainable.",
                employer_questions="Right to work in Australia? Years of experience with Python?"
            ),
            Job(
                title="Full Stack Engineer",
                company="Profectus Australia Pty ltd",
                location="Melbourne VIC",
                job_type="Full-time",
                salary_min=120000,
                salary_max=140000,
                description="Develop full stack applications with a focus on API and UI components.",
                why_choose_us="Diversity policy, quarterly goal reviews, mentorship programs.",
                role_responsibilities="Develop APIs, create dynamic UI components, collaborate on DevOps tasks.",
                benefits="Paid parental leave, flexible work options.",
                about_you="7+ years of experience in full stack development, expertise in microservices.",
                about_company="Profectus Group provides compliance and analytical solutions.",
                employer_questions="Which programming languages are you proficient in? Years of experience in full stack?"
            ),
            Job(
                title="Senior Backend Developer",
                company="The Network",
                location="Sydney NSW",
                job_type="Full-time",
                salary_min=155000,
                salary_max=165000,
                description="Develop backend systems for payment platforms, mentor junior team members.",
                why_choose_us="Exciting startup environment, flexible WFH options.",
                role_responsibilities="Develop backend systems, provide continuous improvements.",
                benefits="Cutting-edge technology, expanding team.",
                about_you="5+ years of backend experience, proficiency in PHP and Go.",
                about_company="The Network specializes in digital payment solutions.",
                employer_questions="Right to work in Australia? Experience with PHP, Go?"
            ),
            Job(
                title="Graduate/Junior .NET Backend Developer",
                company="Lucida",
                location="Scoresby, Melbourne VIC",
                job_type="Full-time",
                salary_min=70000,
                salary_max=90000,
                description="Support tasks in backend development using C# and .NET.",
                why_choose_us="Mentorship program, dynamic environment.",
                role_responsibilities="Develop C# backend applications, participate in training.",
                benefits="Career growth opportunities, mentoring.",
                about_you="Experience with C#, IT degree required.",
                about_company="Lucida is a global leader in industrial digital solutions.",
                employer_questions="C# experience? Right to work in Australia?"
            ),
            Job(
                title="Senior Golang Backend Developer",
                company="NEW SINGULARITY TECHNOLOGY PTY LTD",
                location="Pyrmont, Sydney NSW",
                job_type="Full-time",
                salary_min=130000,
                salary_max=195000,
                description="Design and maintain game backend services.",
                why_choose_us="Work on innovative game technologies.",
                role_responsibilities="Develop game backend services, optimize server performance.",
                benefits="Collaborative team, strong growth focus.",
                about_you="5+ years of Golang experience, proficient with MySQL and MongoDB.",
                about_company="New Singularity Technology is an innovative game developer.",
                employer_questions="Experience with Golang? Proficiency in Mandarin preferred."
            ),
            Job(
                title="Software Engineer",
                company="Splend Pty Ltd",
                location="Sydney NSW",
                job_type="Full-time",
                salary_min=100000,
                salary_max=120000,
                description="Develop tools and services to scale the business.",
                why_choose_us="Dynamic growth company, shared vision for success.",
                role_responsibilities="Build scalable tools, maintain backend services.",
                benefits="Performance bonus, Employee Assistance Program.",
                about_you="3+ years of Python experience, problem-solving skills.",
                about_company="Splend provides accessible vehicle ownership solutions.",
                employer_questions="Right to work in Australia? Years of Python experience?"
            )
        ]

        db.session.bulk_save_objects(jobs)
        db.session.commit()
        print("Seeding of 10 real job listings complete!")

if __name__ == '__main__':
    seed_jobs()
