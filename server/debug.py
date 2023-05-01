from app import app
import time

from models import MenuItem, MenuItemAllergy, Restaurant

from deep_translator import GoogleTranslator
from googletrans import Translator





with app.app_context():

    start_time = time.time()
    google_translator = Translator()
    # deep_translator = GoogleTranslator(source='en', target='fr')
    
    # text = "Hello."

    # try:
    #     deep_result = deep_translator.translate(text)
    #     print(deep_result)
    # except AttributeError as e:
    #     print(f"Error: {e}. Could not translate using Deep Translator.")
    #     deep_result = None

    # try:
    #     google_result = google_translator.translate(text, src='en', dest='fr')
    #     print(google_result.text)
    # except AttributeError as e:
    #     print(f"Error: {e}. Could not translate using Google Translator.")
    #     google_result = None


    print('begin here')
    restaurant = Restaurant.query.filter(Restaurant.id == 1107).first()

    # This uses deep translator
    # for item in restaurant.menu_items:
    #     item.name = deep_translator.translate(item.name)
    #     item.description = deep_translator.translate(item.description)
    #     for allergy in item.allergies:
    #         allergy.name = deep_translator.translate(allergy.name)


    #  This uses google translate
    for item in restaurant.menu_items:
        item.name = google_translator.translate(item.name, src='en', dest='my').text
        item.description = google_translator.translate(item.description, src='en', dest='my').text
        for allergy in item.allergies:
            allergy.name = google_translator.translate(allergy.name, src='en', dest='my').text


    print("Finished")
    end_time = time.time()
    execution_time = end_time - start_time

    print(f"Execution time: {execution_time} seconds")
