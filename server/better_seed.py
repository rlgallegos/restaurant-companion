from random import randint, choice
from faker import Faker
from app import app
from models import db, User, Restaurant, MenuItem, Allergy, MenuItemAllergy, Order, OrderItem, OrderItemAllergy
from data_sets import food, ingredient_names

with app.app_context():
    fake = Faker()

    print('Deleting all records...')
    OrderItemAllergy.query.delete()
    MenuItemAllergy.query.delete()
    Allergy.query.delete()
    MenuItem.query.delete()
    User.query.delete()
    Restaurant.query.delete()
    OrderItem.query.delete()
    Order.query.delete()

    # 8 Restaurants
    restaurant_names = ["Mama's Italian Restaurant", "Asian Fusion Restaurant", "Upper-class Steakhouse", "Generic Burgers", "La Taqueria", "Seafood Extravaganza", "Bill's", "Soup's R' Us"]
    restaurant_websites = ['http://www.mamasitalian.com', 'http://www.asianfusionrestaurant.com', 'http://www.thebeststeakhouse.com', 'http://www.burgers.com', 'http://www.lamejortaqueria.com', 'http://www.seafoodrus.com', 'http://www.theaxethrower.com', 'http://www.soupsnstuff.com']
    restaurant_emails = ['mama@gmail.com', 'yinnyang@hotmail.com', 'sammyboy@gmail.com', 'bobthebuilder@gmail.com', 'elmejorcaballero@whynot.com', 'sarahthesailor@seafoodextravaganza.com', 'bill@bill.com', 'carolannesmith@gmail.com']

    print('Creating restaurants...')
    restaurants = [Restaurant( name=restaurant_names[i], url=restaurant_websites[i], email=restaurant_emails[i]) for i in range(8)]

    db.session.add_all(restaurants)
    db.session.commit()

    print('Creating users...')
    users = []
    for i in range(8):
        user = User(
            username = fake.name(),
            password_hash = fake.password(length=10),
            restaurant = restaurants[i],
            role = 'administrator'
        )
        users.append(user)
        user2 = User(
            username = fake.name(),
            password_hash = fake.password(length=10),
            restaurant = restaurants[i],
            role = 'user'
        )
        users.append(user2)

    db.session.add_all(users)
    db.session.commit()

    print('Creating menu items...')
    menu_item_arrays = [
        ['Spaghetti and Meatballs', 'Pizza', 'Chicken Alfredo', 'Bread', 'Penne a la Marinara', 'Caprese Salad', 'Minestrone', 'Tiramisu'],
        ['Orange Chicken', 'Lo-Mein', 'Wasabi-Crusted Filet Mignon', 'Kung Pao Chicken', "General Tso's", 'Miso Soup', 'Fortune Cookies', "Sushi Roll"],
        ['Filet Mignon', 'Sirloin', 'Bread', 'Side Salad', 'Hamburger', 'The Best Steak Ever', "NY Strip", 'Chocolate Cake'],
        ['The Burger', 'A Better Burger', 'The Garden Burger', "Side of Fries", 'Chocolate Shake', 'Tater Tots', 'Bacon Burger', 'Veggie Burger'],
        ['Burrito al Pastor', 'Shrimp Tacos', 'Menudo', 'Ceviche', 'Chicken Tacos', "Duck Tacos", 'Side of Rice and Beans', 'Horchata'],
        ['Branzino', 'Chilean Sea Bass', 'Mussels', 'Oysters', 'King Crab Legs', 'Shrimp Cocktail', 'Fried Shrimp', 'Garlic Bread'],
        ['Bill', 'Bill with an axe', 'Bill without an axe', 'Billiards', 'A Bill of Sale', "Bill the Bilder", 'Billiam Ballace', "'Mo Bill; 'mo problems"],
        ['Miso Soup', 'Minestrone', 'N.E. Clam Chowder', 'Manhattan Clam Chowder', "French Onion", "Side of Bread", 'Garden Salad', 'Chocolate Chip Cookies']
    ]

    description_array = [
        'Delicious Spaghetti Pasta in a beef bolognese sauce',
        'Fresh Mozzarella on a warm golden baked crust in a tomato-sauce that would make your grandmother proud',
        'Creamy alfredo sauce generously poured over grilled chicken and sprinkled with savory parmesan on top',
        'A generous side of bread smothered in garlic butter',
        'Rich buttery pasta tossed in house-made marinara with hints of basil',
        'Crisp tomato and fresh mozarella sliced layed one atop the other and dressed in extra virgin olive oil and balsamic vinagarette',
        'A warm vegetable soup perfect for the NY winter',
        'Traditional tiramisu made of coffee-dipped ladyfingers and mascarpone cheese, lightly dusted with cocoa powder'
    ]



    menu_items = []
    for i in range(8):
        for j in range(8):
            menu_item = MenuItem(
                name = menu_item_arrays[i][j],
                description = '',
                vegan = fake.boolean(),
                kosher = fake.boolean(),
                restaurant = restaurants[i]
            )
            menu_items.append(menu_item)
    db.session.add_all(menu_items)
    db.session.commit()

    print('Creating allergies...')
    allergies = []
    for i in range(len(ingredient_names)):
        allergy = Allergy(
            name = ingredient_names[i],
            removable = True,
        )
        allergies.append(allergy)
        allergy2 = Allergy(
            name = ingredient_names[i],
            removable = False
        )
        allergies.append(allergy2)
        
    db.session.add_all(allergies)
    db.session.commit()