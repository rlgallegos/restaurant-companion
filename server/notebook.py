import os

from flask import Flask, request, make_response
from flask_migrate import Migrate
from deep_translator import GoogleTranslator
from sqlalchemy.orm import load_only, noload
from timeit import timeit
# from flask_cors import CORS

from models import db, Restaurant, MenuItem, Ingredient

app = Flask(__name__)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rlgallegos85:MzXYvPcBwXVyQy43aTFxA02hmyHEkWyB@dpg-cgngl8bldisfgrv47mpg-a.ohio-postgres.render.com/dbcapstone_yi94'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


# Explicity state context for flask app
with app.app_context():
    # within this block, current_app points to app.

    # Query for Menu Items
    menu_items = MenuItem.query.filter(MenuItem.restaurant_id == 447).options(noload(MenuItem.restaurant)).all()

    # Translate all Menu Item attributes
    for menu_item in menu_items:
        translated_name = GoogleTranslator(source='en', target='fr').translate(menu_item.name)
        translated_description = GoogleTranslator(source='en', target='fr').translate(menu_item.description)
        setattr(menu_item, 'name', translated_name)
        setattr(menu_item, 'description', translated_description)

        # Translate all Ingredients
        for ingredient in menu_item.ingredients:
            translated_ingredient = GoogleTranslator(source='en', target='fr').translate(ingredient.name)
            setattr(ingredient, 'name', translated_ingredient)


    
    print(menu_items[0].to_dict())

    # result = SomeModel.query.with_entities(SomeModel.col1, SomeModel.col2)


    # item_dict_list = [item.to_dict() for item in item_list]

    # The code to be able to get the translated form of all the necessary information

    # for item in item_dict_list:
    #     translated_name = GoogleTranslator(source='en', target='fr').translate(item['name'])
    #     translated_description = GoogleTranslator(source='en', target='fr').translate(item['description'])
    #     item['name'] = translated_name
    #     item['description'] = translated_description

    #     for ingredient in item['ingredients']:
    #         translated_ingredient = GoogleTranslator(source='en', target='fr').translate(ingredient['name'])
    #         ingredient = translated_ingredient

    
    # Now, we re-build the object with the updated material




english_text = "Spaghetti with meatballs"

translated_text = GoogleTranslator(source='auto', target='fr').translate(english_text)

# print(translated_text)