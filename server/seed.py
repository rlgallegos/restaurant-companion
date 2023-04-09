#!/usr/bin/env python3

from random import randint, choice
from faker import Faker
from app import app
from models import db, User, Restaurant, MenuItem, Ingredient
from data_sets import pics, food, ingredient_names

with app.app_context():
    print('Deleting all records...')
    # db.session.query(Ingredient)
    # db.session.query(MenuItem)
    # db.session.query(User)
    # db.session.query(Restaurant)
    Ingredient.query.delete()
    MenuItem.query.delete()
    User.query.delete()
    Restaurant.query.delete()
    # db.session.commit()
    
    

    fake = Faker()

    print('Creating restaurants...')
    restaurants = [Restaurant( name=fake.bs() ) for i in range(25)]
    # restaurants = []
    # for i in range(25):
    #     restaurant = Restaurant(
    #         name = fake.bs()
    #     )
    #     restaurants.append(restaurant)

    db.session.add_all(restaurants)
    db.session.commit()

    print('Creating users...')
    users = []
    for i in range(75):
        user = User(
            name = fake.name(),
            hashed_password = fake.password(length=25),
            restaurant = choice(restaurants)
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print('Creating menu items...')
    # food = ['Orange Chicken', 'Wasabi Crusted Filet', 'Grilled Branzino', 'Fried Rice', 'Lo Mein', 'Omakase', 'Vegetable Dumplings', 'Gyoza', 'Egg Rolls']
    # pics = [
    #     '/sample_pics/bokchoy.jpeg',
    #     '/sample_pics/dumplings.jpeg',
    #     '/sample_pics/fish.jpeg',
    #     '/sample_pics/ribs.jpeg',
    #     '/sample_pics/rice.jpeg',
    #     '/sample_pics/roll.jpeg',
    #     '/sample_pics/salmon.jpeg',
    #     '/sample_pics/sashimi.jpeg',
    #     '/sample_pics/soup.jpeg',
    #     '/sample_pics/steak.jpeg'
    # ]
    menu_items = []
    for i in range(300):
        menu_item = MenuItem(
            name = choice(food),
            description = fake.sentence(),
            pic_path = choice(pics),
            vegan = fake.boolean(),
            kosher = fake.boolean(),
            restaurant = choice(restaurants)
        )
        menu_items.append(menu_item)

    db.session.add_all(menu_items)
    db.session.commit()

    print('Creating ingredients...')
    ingredients = []
    for i in range(2000):
        ingredient = Ingredient(
            name = choice(ingredient_names),
            removable = fake.boolean(),
            menu_item = choice(menu_items)
        )
        ingredients.append(ingredient)
        
    db.session.add_all(ingredients)
    db.session.commit()