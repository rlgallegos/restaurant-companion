"""password logic

Revision ID: 761271875b76
Revises: dd0d0bdf7cc7
Create Date: 2023-04-30 16:46:14.158246

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '761271875b76'
down_revision = 'dd0d0bdf7cc7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index('ix_menu_items_restaurant_id')
        batch_op.create_index(batch_op.f('ix_menu_items_restaurant_id'), ['restaurant_id'], unique=False)

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('_password_hash')

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)

    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_menu_items_restaurant_id'))
        batch_op.create_index('ix_menu_items_restaurant_id', ['restaurant_id'], unique=False)

    # ### end Alembic commands ###