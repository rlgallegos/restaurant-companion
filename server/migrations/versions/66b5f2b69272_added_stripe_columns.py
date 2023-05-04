"""Added stripe columns

Revision ID: 66b5f2b69272
Revises: 761271875b76
Create Date: 2023-05-04 15:53:54.600486

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66b5f2b69272'
down_revision = '761271875b76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index('ix_menu_items_restaurant_id')
        batch_op.create_index(batch_op.f('ix_menu_items_restaurant_id'), ['restaurant_id'], unique=False)

    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stripe_customer_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('stripe_status', sa.String(), nullable=True))
        batch_op.drop_index('ix_restaurants_name')
        batch_op.create_index(batch_op.f('ix_restaurants_name'), ['name'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('restaurants', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_restaurants_name'))
        batch_op.create_index('ix_restaurants_name', ['name'], unique=False)
        batch_op.drop_column('stripe_status')
        batch_op.drop_column('stripe_customer_id')

    with op.batch_alter_table('menu_items', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_menu_items_restaurant_id'))
        batch_op.create_index('ix_menu_items_restaurant_id', ['restaurant_id'], unique=False)

    # ### end Alembic commands ###
