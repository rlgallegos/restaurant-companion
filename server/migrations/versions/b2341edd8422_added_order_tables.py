"""Added order tables

Revision ID: b2341edd8422
Revises: bb114bb05244
Create Date: 2023-04-24 15:53:04.642406

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2341edd8422'
down_revision = 'bb114bb05244'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name=op.f('fk_order_items_order_id_orders')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_item_allergies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('allergy_id', sa.Integer(), nullable=True),
    sa.Column('order_item_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['allergy_id'], ['allergies.id'], name=op.f('fk_order_item_allergies_allergy_id_allergies')),
    sa.ForeignKeyConstraint(['order_item_id'], ['order_items.id'], name=op.f('fk_order_item_allergies_order_item_id_order_items')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index('ix_menu_items_restaurant_id')
        batch_op.create_index(batch_op.f('ix_menu_items_restaurant_id'), ['restaurant_id'], unique=False)

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)

    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_menu_items_restaurant_id'))
        batch_op.create_index('ix_menu_items_restaurant_id', ['restaurant_id'], unique=False)

    op.drop_table('order_item_allergies')
    op.drop_table('order_items')
    op.drop_table('orders')
    # ### end Alembic commands ###
