from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from database.db import db
from database.movie import Movie 
from datetime import datetime, timedelta
from dotenv import load_dotenv
from functools import wraps
import jwt
import os

routes = Blueprint('routes', __name__)

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')

@routes.route('/token', methods=['POST', 'GET'])
def create_token():
    if request.method == 'POST':
        data = request.get_json()
        role = data.get('role')
    else:
        role = request.args.get('role')
    payload = {
        'role': role,
        'exp': datetime.utcnow() + timedelta(minutes=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return {'token': token}, 200

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_role = data['role']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_role, *args, **kwargs)
    return decorated

@routes.route('/favorites', methods=['POST'])
@token_required
def add_favorite(current_role):
    if current_role != 'subscriber':
        return jsonify({'message': 'Not authorized!'}), 403
    try:
        data = request.get_json()
        movie = Movie(id=data['id'], title=data['title'], original_language=data['original_language'], vote_average=data['vote_average'], overview=data['overview'], release_date=data['release_date'], popularity=data['popularity'], poster_path=data['poster_path'], backdrop_path=data['backdrop_path'], vote_count=data['vote_count'], video=data['video'], adult=data['adult'], original_title=data['original_title'])
        db.session.add(movie)
        db.session.commit()
        return {"message": "Movie added to favorites"}, 201
    except IntegrityError:
        db.session.rollback()
        return {"message": "Movie could not be added. It may already exist in favorites or the data provided is not valid."}, 400

@routes.route('/favorites', methods=['GET'])
def get_favorites():
    limit = request.args.get('limit', default=10, type=int)
    offset = request.args.get('offset', default=0, type=int)

    if limit < 0 or offset < 0:
        return {"message": "Invalid values for limit or offset. They must be non-negative."}, 400

    total_movies = Movie.query.count()
    if offset >= total_movies:
        return {"message": "Offset is too large. There are not that many movies."}, 400

    movies = Movie.query.offset(offset).limit(limit).all()
    return jsonify({movie.id: movie.to_dict() for movie in movies}), 200

@routes.route('/favorites/<int:id>', methods=['GET'])
def get_favorite(id):
    movie = Movie.query.filter_by(id=id).first()
    return jsonify(movie.to_dict()), 200

@routes.route('/favorites/<int:id>', methods=['PUT'])
@token_required
def update_favorite(current_role, id):
    if current_role != 'subscriber':
        return jsonify({'message': 'Not authorized!'}), 403
    try:
        data = request.get_json()
        movie = Movie.query.filter_by(id=id).first()
        if movie:
            movie.update(data)
            db.session.commit()
            return {"message": "Movie updated successfully"}, 200
        else:
            return {"message": "Movie not found"}, 404
    except IntegrityError:
        db.session.rollback()
        return {"message": "Movie could not be updated. The data provided is not valid."}, 400

@routes.route('/favorites/<int:id>', methods=['DELETE'])
@token_required
def delete_favorite(current_role, id):
    if current_role != 'subscriber':
        return jsonify({'message': 'Not authorized!'}), 403
    movie = Movie.query.filter_by(id=id).first()
    if movie:
        db.session.delete(movie)
        db.session.commit()
        return {"message": "Movie deleted"}, 200
    else:
        return {"message": "Movie not found"}, 404
    