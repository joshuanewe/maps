from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)
CORS(app)

class Climb(db.Model):
    __tablename__ = 'climbs'
    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('Route', db.String(255))
    area = db.Column('Location', db.String(255))
    url = db.Column('URL', db.String(255))
    star_rating = db.Column('Avg Stars', db.Float)
    personal_rating = db.Column('Your Stars', db.Float)
    climb_type = db.Column('Route Type', db.String(50))
    difficulty = db.Column('Rating', db.String(50))
    pitches = db.Column('Pitches', db.Integer)
    latitude = db.Column('Area Latitude', db.Float)
    longitude = db.Column('Area Longitude', db.Float)

@app.route('/climbs', methods=['GET'])
def get_climbs():
    climbs = Climb.query.all()
    return jsonify([{
        'id': climb.id,
        'name': climb.name,
        'area': climb.area,
        'url': climb.url,
        'star_rating': climb.star_rating,
        'personal_rating': climb.personal_rating,
        'climb_type': climb.climb_type,
        'difficulty': climb.difficulty,
        'pitches': climb.pitches,
        'latitude': climb.latitude,
        'longitude': climb.longitude,
    } for climb in climbs])

@app.route('/search', methods=['GET'])
def search_climbs():
    query = request.args.get('query')
    if not query:
        return jsonify([])
    climbs = Climb.query.filter(
        (Climb.name.ilike(f'%{query}%')) |
        (Climb.area.ilike(f'%{query}%')) |
        (Climb.difficulty.ilike(f'%{query}%'))
    ).all()

    results = []
    for climb in climbs:
        results.append({
            'id': climb.id,
            'name': climb.name,
            'area': climb.area,
            'url': climb.url,
            'star_rating': climb.star_rating,
            'personal_rating': climb.personal_rating,
            'climb_type': climb.climb_type,
            'difficulty': climb.difficulty,
            'pitches': climb.pitches,
            'latitude': climb.latitude,
            'longitude': climb.longitude,
        })

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
