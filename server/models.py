from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, index=True)

    serialize_rules = ('-users.restaurant',)
    serialize_rules = ('-menu_items.restaurant',)

    menu_items = db.relationship('MenuItem', back_populates='restaurant')
    users = db.relationship('User', back_populates='restaurant')



class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menu_items'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    pic_path = db.Column(db.String)
    vegan = db.Column(db.Boolean)
    kosher = db.Column(db.Boolean)

    serialize_rules = ('-restaurant.menu_items',)
    serialize_rules = ('-ingredients.menu_item',)

    restaurant = db.relationship('Restaurant', back_populates='menu_items')
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), index=True)

    ingredients = db.relationship('Ingredient', back_populates='menu_item')


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    removable = db.Column(db.Boolean)

    serialize_rules = ('-menu_item.ingredients',)

    menu_item = db.relationship('MenuItem', back_populates='ingredients')
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'))

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    hashed_password = db.Column(db.String)

    serialize_rules = ('-restaurant.users',)
    
    restaurant = db.relationship('Restaurant', back_populates='users')
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))












