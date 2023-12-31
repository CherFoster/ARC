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
        for _ in range(20):
            house = House(
                house_number = fake.random_int(min=000, max=9999),
                street_name = fake.street_name(),
                city = fake.city(),
                zip_code = fake.zipcode(),
                latitude = random.uniform(24.0, 50.0),
                longitude = random.uniform(-125.0, -67.0),
                occupants = random.randint(0,20),
                animals = random.randint(0,20)
            )
            houses.append(house)
        db.session.add_all(houses)
        db.session.commit()

        assignments = []
        for user in users:
            user_houses = random.sample(houses, k=randint(1,4))
            for house in user_houses:
                # create a SQL statement to insert an assignment into the assignment table
                stmt = assignment.insert().values(
                    user_id=user.id, 
                    house_id=house.id) 
                 # compile the SQL statement into a string with literal binds
                rendered = stmt.compile(compile_kwargs={"literal_binds": True})
                sql = str(rendered)
    
                assignments.append(sql)
        db.session.commit()

        # Execute INSERTs    
        for stmt in assignments:
            db.session.execute(text(stmt))
        db.session.commit()

        statuses = []
        status_options = [
            "Not contacted",
            "Evacuated",
            "Refused to evacuate",
            "Needs assistance",
            "House unoccupied",
            "Unable to contact"
        ]
                
        for house in houses:
            status = EvacuationStatus(
                status = random.choice(status_options),
                timestamp = fake.date_time_this_decade()
            )
            db.session.add(status)
            house.evacuation_status = status
            statuses.append(status)
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