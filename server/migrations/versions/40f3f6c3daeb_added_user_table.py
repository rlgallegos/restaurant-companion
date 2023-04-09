"""Added User Table

Revision ID: 40f3f6c3daeb
Revises: 
Create Date: 2023-04-07 15:38:49.709811

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40f3f6c3daeb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=True),
    sa.Column('restaurant_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name=op.f('fk_users_restaurant_id_restaurants')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)
        batch_op.drop_column('hashed_password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hashed_password', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)

    op.drop_table('users')
    # ### end Alembic commands ###
