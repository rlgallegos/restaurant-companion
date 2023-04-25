"""added new columns to order tables

Revision ID: ecfe34c4d8fe
Revises: 7d8a0a6fbbe4
Create Date: 2023-04-24 19:33:37.816982

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ecfe34c4d8fe'
down_revision = '7d8a0a6fbbe4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index('ix_menu_items_restaurant_id')
        batch_op.create_index(batch_op.f('ix_menu_items_restaurant_id'), ['restaurant_id'], unique=False)

    with op.batch_alter_table('order_items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('notes', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('quantity', sa.Integer(), nullable=True))

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)

    with op.batch_alter_table('order_items', schema=None) as batch_op:
        batch_op.drop_column('quantity')
        batch_op.drop_column('notes')

    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_menu_items_restaurant_id'))
        batch_op.create_index('ix_menu_items_restaurant_id', ['restaurant_id'], unique=False)

    # ### end Alembic commands ###
