"""Remove saved_jobs and applications tables

Revision ID: 6d4ef1b1c7bb
Revises: 158c3abf5acd
Create Date: 2024-10-23 19:21:01.445793

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d4ef1b1c7bb'
down_revision = '158c3abf5acd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saved_jobs')
    op.drop_table('applications')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('applications',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('status', sa.VARCHAR(length=50), nullable=False),
    sa.Column('applied_at', sa.DATETIME(), nullable=True),
    sa.Column('job_id', sa.INTEGER(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['job_id'], ['jobs.id'], name='fk_applications_job_id_jobs'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_applications_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saved_jobs',
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('job_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['jobs.id'], name='fk_saved_jobs_job_id_jobs'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_saved_jobs_user_id_users'),
    sa.PrimaryKeyConstraint('user_id', 'job_id')
    )
    # ### end Alembic commands ###