"""upinverted house and evacstatus relationship for evac status has the house FK

Revision ID: fa32eaa4e98d
Revises: 0e1b3b7788d7
Create Date: 2023-10-19 11:24:41.153308

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa32eaa4e98d'
down_revision = '0e1b3b7788d7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evac_status', schema=None) as batch_op:
        batch_op.add_column(sa.Column('house_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_evac_status_house_id_houses'), 'houses', ['house_id'], ['id'])

    with op.batch_alter_table('houses', schema=None) as batch_op:
        batch_op.drop_constraint('fk_houses_evacuation_status_id_evac_status', type_='foreignkey')
        batch_op.drop_column('evacuation_status_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('houses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('evacuation_status_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_houses_evacuation_status_id_evac_status', 'evac_status', ['evacuation_status_id'], ['id'])

    with op.batch_alter_table('evac_status', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_evac_status_house_id_houses'), type_='foreignkey')
        batch_op.drop_column('house_id')

    # ### end Alembic commands ###
