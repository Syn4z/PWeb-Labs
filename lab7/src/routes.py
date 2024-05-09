from flask import Blueprint, request, jsonify
from database.db import db
from database.movie import Movie 

routes = Blueprint('routes', __name__)

@routes.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.get_json()
    movie = Movie(id=data['id'], title=data['title'], original_language=data['original_language'], vote_average=data['vote_average'], overview=data['overview'], release_date=data['release_date'], popularity=data['popularity'], poster_path=data['poster_path'], backdrop_path=data['backdrop_path'], vote_count=data['vote_count'], video=data['video'], adult=data['adult'], original_title=data['original_title'])
    db.session.add(movie)
    db.session.commit()
    return {"message": "Movie added to favorites"}, 201

@routes.route('/favorites', methods=['GET'])
def get_favorites():
    movies = Movie.query.all()
    return jsonify({movie.id: movie.to_dict() for movie in movies}), 200

@routes.route('/favorites/<int:id>', methods=['GET'])
def get_favorite(id):
    movie = Movie.query.filter_by(id=id).first()
    return jsonify(movie.to_dict()), 200

@routes.route('/favorites/<int:id>', methods=['PUT'])
def update_favorite(id):
    data = request.get_json()
    movie = Movie.query.filter_by(id=id).first()
    for key, value in data.items():
        setattr(movie, key, value)
    db.session.commit()
    return {"message": "Movie updated"}, 200

@routes.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    movie = Movie.query.filter_by(id=id).first()
    if movie:
        db.session.delete(movie)
        db.session.commit()
        return {"message": "Movie deleted"}, 200
    else:
        return {"message": "Movie not found"}, 404