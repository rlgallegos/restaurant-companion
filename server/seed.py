#!/usr/bin/env python3

from random import randint, choice
from faker import Faker
from app import app
from models import db, User, Restaurant, MenuItem, Allergy, MenuItemAllergy, Order, OrderItem, OrderItemAllergy
from data_sets import food, ingredient_names

with app.app_context():
    print('Deleting all records...')
    OrderItemAllergy.query.delete()
    MenuItemAllergy.query.delete()
    Allergy.query.delete()
    MenuItem.query.delete()
    User.query.delete()
    Restaurant.query.delete()
    OrderItem.query.delete()
    Order.query.delete()

    # db.session.commit()
    
    

    fake = Faker()

    print('Creating restaurants...')
    restaurants = [Restaurant( name=fake.bs() ) for i in range(12)]

    db.session.add_all(restaurants)
    db.session.commit()

    print('Creating users...')
    users = []
    for i in range(33):
        user = User(
            username = fake.name(),
            password_hash = fake.password(length=25),
            restaurant = choice(restaurants)
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    print('Creating menu items...')
    menu_items = []
    for i in range(150):
        menu_item = MenuItem(
            name = choice(food),
            description = fake.sentence(),
            vegan = fake.boolean(),
            kosher = fake.boolean(),
            restaurant = choice(restaurants)
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

    print('Creating menu_item_allergies...')
    menu_item_allergies = []
    for i in range(500):
        new_menu_item = MenuItemAllergy(
            menu_item = choice(menu_items),
            allergy = choice(allergies)
        )
        menu_item_allergies.append(new_menu_item)
    db.session.add_all(menu_item_allergies)
    db.session.commit()
