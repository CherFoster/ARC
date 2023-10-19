from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from datetime import datetime

assignment = db.Table('assignment', 
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('house_id', db.Integer, db.ForeignKey('houses.id'))
)
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    # works for users recursion
    serialize_rules = ('-_password_hash', '-notes', '-houses',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    agency = db.Column(db.String)
    image = db.Column(db.String)

    houses = db.relationship('House', secondary=assignment, back_populates='users')

    notes = db.relationship('Note', back_populates='user')
  
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    # Takes password, hashes it, and stores the hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # compares hashed password to the stored hash  
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return (
            f'User: {self.username}, ' \
            + f'Agency: {self.agency}, ' \
            + f'Image: {self.image} ' \
        )
    
class House(db.Model, SerializerMixin):
    __tablename__ = "houses"

    serialize_rules = ('-users', '-notes', '-evacuation_status',)

    id = db.Column(db.Integer, primary_key=True)
    house_number = db.Column(db.Integer)
    street_name = db.Column(db.String)
    city = db.Column(db.String)
    zip_code = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    occupants = db.Column(db.Integer)
    animals = db.Column(db.Integer)

    evacuation_status = db.relationship('EvacuationStatus', back_populates='house', uselist=False)

    users = db.relationship('User', secondary=assignment, back_populates='houses')

    notes = db.relationship('Note', back_populates='house')

    # show the actual evacuation status as a string 
    def to_dict(self):
        data = super().to_dict()

        if self.evacuation_status:
            data['evacuation_status'] = self.evacuation_status.status
    
        return data

    def __repr__(self):
        return (
            f'Address: {self.house_number} {self.street_name}, {self.city}, {self.zip_code}, ' \
            + f'Latitude: {self.latitude}, ' \
            + f'Longitude: {self.longitude} ' \
            + f'Number of Occupants: {self.occupants}, ' \
            + f'Number of Animals: {self.animals}, ' \
        )
    
class EvacuationStatus(db.Model, SerializerMixin):
    __tablename__ = "evac_status"

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
    
    house = db.relationship('House', back_populates='evacuation_status')

    def __repr__(self):
        return f'<Evacuation Status: {self.status} at {self.timestamp}>'
    
    @validates('status')
    def validate_status(self, key, status):
        if not status or not isinstance(status, str):
            raise ValueError('Status must not be None or be empty')
        return status
    
class Note(db.Model, SerializerMixin):
    __tablename__ = "notes"

    serialize_rules = ('-user.notes', '-house_id', '-user.id', '-user.email', '-user_id', '-house.id', '-id', )

    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String)
    medical_conditions = db.Column(db.String)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))

    user = db.relationship('User', back_populates='notes')
    house = db.relationship('House', back_populates='notes')
    
    # serialize the full house object so in /houses/id/notes it includes the evacuation status
    def to_dict(self):
        data = super().to_dict()
        data['house'] = self.house.to_dict() 
        return data

    def __repr__(self):
        return (
            f'Details: {self.details}, ' \
            + f'Medical Condition: {self.medical_conditions}' \
        )
    
