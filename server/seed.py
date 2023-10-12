#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, House, EvacuationStatus, Note, assignment
import random
from sqlalchemy import text

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        House.query.delete()
        EvacuationStatus.query.delete()
        Note.query.delete()

        users = []
        usernames = []
        for i in range(5):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username)
            user.password_hash = user.username + 'password'
            users.append(user)
            db.session.add_all(users)
        db.session.commit()

        houses = []
        for _ in range(10):
            house = House(
                address = fake.address(),
                latitude = random.uniform(-90.0, 90.0),
                longitude = random.uniform(-90.0, 90.0),
                occupants = random.randint(0,20),
                animals = random.randint(0,20)
            )
            # overrides the default None initialization to start as an empty list
            houses.append(house)
            for house in houses:
                house.evacuation_status = []
            db.session.add_all(houses)
        db.session.commit()

        assignments = []
        for user in users:
            user_houses = random.sample(houses, k=randint(1,5))
            for house in user_houses:
                stmt = assignment.insert().values(
                    user_id=user.id, 
                    house_id=house.id) 
    
                rendered = stmt.compile(compile_kwargs={"literal_binds": True})
                sql = str(rendered)
    
                assignments.append(sql)
        db.session.commit()

# Execute INSERTs    
        for stmt in assignments:
            db.session.execute(text(stmt))

        db.session.commit()


        status_array = []
        status_options = [
            "Not contacted",
            "Evacuated",
            "Refused to evacuate",
            "Needs assistance",
            "House unoccupied",
            "Unable to contact"
        ]
        for house in houses:
            evacuation_status = EvacuationStatus(
                status = random.choice(status_options),
                timestamp = fake.date_time_this_decade()
            )
            house.evacuation_status.append(evacuation_status)
            status_array.append(evacuation_status)
        db.session.add_all(status_array)
        db.session.commit()

        notes = []
        for _ in range(15):
            note = Note(
                details = fake.paragraph(nb_sentences=5),
                medical_conditions = fake.word(),
                timestamp = fake.date_time_this_decade(),
                user_id = rc(users).id,
                house_id = rc(houses).id
            )
            notes.append(note)
        db.session.add_all(notes)
        db.session.commit()
        
        print("Complete.")