import os

from flask import Flask, request, make_response
from flask_migrate import Migrate
# from flask_cors import CORS

from models import db, Restaurant, MenuItem, Ingredient

app = Flask(__name__)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


# Routes

# @app.route('/login')

# @app.route('/managers')

@app.route('/post', methods=['GET', 'POST'])
def post():
    data = request.get_json()

    db.session.add(data)
    db.session.commit()
    return make_response(data, 200)


@app.route('/<string:restaurant>')
def index(restaurant):
    if request.method == 'GET':
        Restaurant.query.filter(Restaurant.name == restaurant).first()








if __name__ == '__main__':
    app.run(port=5555, debug=True)