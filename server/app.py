#!/usr/bin/env python3
from flask import request, make_response, session, jsonify, abort, render_template
from flask_restful import Resource
from models import User, House, EvacuationStatus, Note
from config import app, db, api
from werkzeug.exceptions import NotFound

@app.route('/')
def index(id=0):
    return render_template('index.html')

class Signup(Resource):
    def post(self):
        json_data = request.get_json()

        username = json_data.get('username')
        password = json_data.get('password')
        email = json_data.get('email')
        agency = json_data.get('agency')
        image = json_data.get('image')

        if username and password:
            new_user = User(
                username=username,
                email=email,
                agency=agency,
                image=image
            )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
        
            response = make_response(new_user.to_dict(), 201)
            return response
api.add_resource(Signup, '/api/signup')

class Login(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data.get('username')
        password = json_data.get('password')
        user = User.query.filter(User.username == username).first()
        
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                response = make_response(user.to_dict(), 200)
                return response
            print(f"Username: {username}, Password: {password}")
        return {'Incorrect username or password'}, 401
api.add_resource(Login, '/api/login')

class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(user.to_dict(), 200)
            return response
        except:
            abort(401, "Please log in")
api.add_resource(CheckSession, '/api/check_session')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        response = make_response('', 204)
        return response
api.add_resource(Logout, '/api/logout')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
api.add_resource(Users, '/api/users')

class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            raise NotFound
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        data = request.get_json()
        user = User.query.get(id)
        if not user:
            raise NotFound
        if not session.get('user_id'):
            return {"message" : "Unauthorized"}, 401
        if 'agency' in data:
            user.agency = data['agency']
        if 'image' in data:
            user.image = data['image']

        db.session.commit()
        return make_response(user.to_dict(), 200) 
api.add_resource(UsersById, '/api/users/<int:id>')

class Houses(Resource):
    def get(self):
        houses = [house.to_dict() for house in House.query.all()]
        return make_response(houses, 200)
api.add_resource(Houses, '/api/houses')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

