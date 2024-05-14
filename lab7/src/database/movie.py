from database.db import db


class Movie(db.Model):
    pk = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(100))
    original_language = db.Column(db.String(100), nullable=False)
    vote_average = db.Column(db.Float)
    overview = db.Column(db.String(1000))
    release_date = db.Column(db.String(100))
    popularity = db.Column(db.Float)
    poster_path = db.Column(db.String(100))
    backdrop_path = db.Column(db.String(100))
    vote_count = db.Column(db.Integer)
    video = db.Column(db.Boolean)
    adult = db.Column(db.Boolean)
    original_title = db.Column(db.String(100))

    def to_dict(self):
        return {
            "pk": self.pk,
            "id": self.id,
            "title": self.title,
            "original_language": self.original_language,
            "vote_average": self.vote_average,
            "overview": self.overview,
            "release_date": self.release_date,
            "popularity": self.popularity,
            "poster_path": self.poster_path,
            "backdrop_path": self.backdrop_path,
            "vote_count": self.vote_count,
            "video": self.video,
            "adult": self.adult,
            "original_title": self.original_title
        }
        