#!/usr/bin/env python3
from random import randint, choice as rc
from faker import Faker
from app import app
from config import db
from models import User, House, EvacuationStatus, Note
import random

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
        for i in range(10):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username
            )
            user.password_hash = user.username + 'password'
            users.append(user)
            db.session.add_all(users)

        db.session.commit()

        house = []
        for _ in range(20):
            house = House(
                address = fake.address(),
                latitude = random.uniform(-90.0, 90.0),
                longitude = random.uniform(-90.0, 90.0),
                occupants = random.randint(0,20),
                animals = random.randint(0,20)
            )
            # create a random sample of users and houses for assignment table

        print("Complete.")