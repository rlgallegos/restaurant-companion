import os

from flask import Flask, request, make_response
from flask_migrate import Migrate
from deep_translator import GoogleTranslator
from sqlalchemy.orm import noload
# from flask_cors import CORS

from models import db, Restaurant, MenuItem, Ingredient

app = Flask(__name__)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rlgallegos85:MzXYvPcBwXVyQy43aTFxA02hmyHEkWyB@dpg-cgngl8bldisfgrv47mpg-a.ohio-postgres.render.com/dbcapstone_yi94'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


# Routes

# @app.route('/login')
@app.route('/')
def test():
    return '<h1>Test Successful</h1>'

# @app.route('/managers')

# @app.route('/post', methods=['GET', 'POST'])
# def post():
#     data = request.get_json()

#     db.session.add(data)
#     db.session.commit()
#     return make_response(data, 200)



@app.route('/<int:id>/<string:lang>/items')
def menu(id, lang):
    if request.method == 'GET':

            # Query for Menu Items
        menu_items = MenuItem.query.filter(MenuItem.restaurant_id == id).options(noload(MenuItem.restaurant)).all()

        # Translate all Menu Item attributes
        for menu_item in menu_items:
            translated_name = GoogleTranslator(source='en', target=lang).translate(menu_item.name)
            translated_description = GoogleTranslator(source='en', target=lang).translate(menu_item.description)
            setattr(menu_item, 'name', translated_name)
            setattr(menu_item, 'description', translated_description)

            # Translate all Ingredients
            for ingredient in menu_item.ingredients:
                translated_ingredient = GoogleTranslator(source='en', target=lang).translate(ingredient.name)
                setattr(ingredient, 'name', translated_ingredient)

        menu_items_dict_list = [menu_item.to_dict() for menu_item in menu_items]
        response = make_response(menu_items_dict_list, 200)
        return response









if __name__ == '__main__':
    app.run(port=5555, debug=True)