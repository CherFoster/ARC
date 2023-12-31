"""separated address into different columns in House model

Revision ID: 0e1b3b7788d7
Revises: 2f41ff87592a
Create Date: 2023-10-16 10:34:55.310272

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0e1b3b7788d7'
down_revision = '2f41ff87592a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('houses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('house_number', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('street_name', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('city', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('zip_code', sa.Integer(), nullable=True))
        batch_op.drop_column('address')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('houses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('zip_code')
        batch_op.drop_column('city')
        batch_op.drop_column('street_name')
        batch_op.drop_column('house_number')

    # ### end Alembic commands ###
