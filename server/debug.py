from app import app
import time

from models import MenuItem, MenuItemAllergy, Restaurant, db

from deep_translator import GoogleTranslator
from googletrans import Translator

from faker import Faker


with app.app_context():
    # mamas = Restaurant.query.filter(Restaurant.name == "Mama's Italian Restaurant").first()
   
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

    restaurant = Restaurant.query.filter(Restaurant.name == "Min's BBQ Joint").first()
    try:
        # restaurant.name = "Min's BBQ Joint"
        restaurant.url = "http://www.I'M-THE-EXAMPLE-RESTAURANT.com"
        db.session.add(restaurant)
        # db.session.delete(restaurant)
        db.session.commit()
    except Exception as e:
        print(e)
        print('failed')

