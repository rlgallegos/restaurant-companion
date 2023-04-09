"""Fixed Recursion Error

Revision ID: 7ccf224c03fc
Revises: 5abce43c49bb
Create Date: 2023-04-07 20:07:51.484772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ccf224c03fc'
down_revision = '5abce43c49bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)

    # ### end Alembic commands ###
