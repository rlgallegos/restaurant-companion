from app import app
import time

from models import MenuItem, MenuItemAllergy, Restaurant, db

from deep_translator import GoogleTranslator
from googletrans import Translator

from faker import Faker


with app.app_context():
    # mamas = Restaurant.query.filter(Restaurant.name == "Mama's Italian Restaurant").first()
    # print(mamas.to_dict())

   
    # description_array = [
    # 'Delicious Spaghetti Pasta in a beef bolognese sauce',
    # 'Fresh Mozzarella on a warm golden baked crust in a tomato-sauce that would make your grandmother proud',
    # 'Creamy alfredo sauce generously poured over grilled chicken and sprinkled with savory parmesan on top',
    # 'A generous side of bread smothered in garlic butter',
    # 'Rich buttery pasta tossed in house-made marinara with hints of basil',
    # 'Crisp tomato and fresh mozarella sliced layed one atop the other and dressed in extra virgin olive oil and balsamic vinagarette',
    # 'A warm vegetable soup perfect for the NY winter',
    # 'Traditional tiramisu made of coffee-dipped ladyfingers and mascarpone cheese, lightly dusted with cocoa powder'
    # ]

    # for i in range(8):
    #     mamas.menu_items[i].description = description_array[i]

    # for j in range(8):
    #     print(mamas.menu_items[j].description)

    # db.session.add(mamas)
    # db.session.commit()

    restaurant_to_delete = Restaurant.query.filter(Restaurant.name == 'Example Restaurant3').first()
    try:
        db.session.delete(restaurant_to_delete)
        db.session.commit()
    except:
        print('failed to delete')


    # fake = Faker()
    # print('Creating menu items...')
    # menu_item_arrays = [
    #     ['Spaghetti and Meatballs', 'Pizza', 'Chicken Alfredo', 'Bread', 'Penne a la Marinara', 'Caprese Salad', 'Minestrone', 'Tiramisu'],
    #     ['Orange Chicken', 'Lo-Mein', 'Wasabi-Crusted Filet Mignon', 'Kung Pao Chicken', "General Tso's", 'Miso Soup', 'Fortune Cookies', "Sushi Roll"],
    #     ['Filet Mignon', 'Sirloin', 'Bread', 'Side Salad', 'Hamburger', 'The Best Steak Ever', "NY Strip", 'Chocolate Cake'],
    #     ['The Burger', 'A Better Burger', 'The Garden Burger', "Side of Fries", 'Chocolate Shake', 'Tater Tots', 'Bacon Burger', 'Veggie Burger'],
    #     ['Burrito al Pastor', 'Shrimp Tacos', 'Menudo', 'Ceviche', 'Chicken Tacos', "Duck Tacos", 'Side of Rice and Beans', 'Horchata'],
    #     ['Branzino', 'Chilean Sea Bass', 'Mussels', 'Oysters', 'King Crab Legs', 'Shrimp Cocktail', 'Fried Shrimp', 'Garlic Bread'],
    #     ['Bill', 'Bill with an axe', 'Bill without an axe', 'Billiards', 'A Bill of Sale', "Bill the Bilder", 'Billiam Ballace', "'Mo Bill; 'mo problems"],
    #     ['Miso Soup', 'Minestrone', 'N.E. Clam Chowder', 'Manhattan Clam Chowder', "French Onion", "Side of Bread", 'Garden Salad', 'Chocolate Chip Cookies']
    # ]
    # menu_items = []
    # for i in range(8):
    #     for j in range(8):
    #         menu_item = MenuItem(
    #             name = menu_item_arrays[i][j],
    #             description = '',
    #             vegan = fake.boolean(),
    #             kosher = fake.boolean(),
    #             restaurant = restaurants[i]
    #         )
    #         menu_items.append(menu_item)
    # db.session.add_all(menu_items)
    # db.session.commit()

    # start_time = time.time()
    # google_translator = Translator()
    # # deep_translator = GoogleTranslator(source='en', target='fr')
    
    # # text = "Hello."

    # # try:
    # #     deep_result = deep_translator.translate(text)
    # #     print(deep_result)
    # # except AttributeError as e:
    # #     print(f"Error: {e}. Could not translate using Deep Translator.")
    # #     deep_result = None

    # # try:
    # #     google_result = google_translator.translate(text, src='en', dest='fr')
    # #     print(google_result.text)
    # # except AttributeError as e:
    # #     print(f"Error: {e}. Could not translate using Google Translator.")
    # #     google_result = None


    # print('begin here')
    # restaurant = Restaurant.query.filter(Restaurant.id == 1107).first()

    # # This uses deep translator
    # # for item in restaurant.menu_items:
    # #     item.name = deep_translator.translate(item.name)
    # #     item.description = deep_translator.translate(item.description)
    # #     for allergy in item.allergies:
    # #         allergy.name = deep_translator.translate(allergy.name)


    # #  This uses google translate
    # for item in restaurant.menu_items:
    #     item.name = google_translator.translate(item.name, src='en', dest='my').text
    #     item.description = google_translator.translate(item.description, src='en', dest='my').text
    #     for allergy in item.allergies:
    #         allergy.name = google_translator.translate(allergy.name, src='en', dest='my').text


    # print("Finished")
    # end_time = time.time()
    # execution_time = end_time - start_time

    # print(f"Execution time: {execution_time} seconds")
