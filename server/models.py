from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from itertools import chain


# # Translation instance
# from deep_translator import GoogleTranslator
# translator = GoogleTranslator(source='en', target='en')


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'
    
    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, index=True)
    password_hash = db.Column(db.String)

    serialize_rules = ('-users, ''-password_hash', '-menu_items.restaurant', '-users.restaurant', 'allergies', '-allergy_proxy')

    menu_items = db.relationship('MenuItem', back_populates='restaurant')
    users = db.relationship('User', back_populates='restaurant')
    allergy_proxy = association_proxy('menu_items', 'allergies')

    menu_item_names = association_proxy('menu_items', 'name')
    menu_item_descriptions = association_proxy('menu_items', 'description')

    @property
    def allergies(self):
        return set(chain.from_iterable(self.allergy_proxy))

    @property
    def allergy_names(self):
        return list(set([allergy.name for allergy in self.allergies]))

    @property
    def all_names(self):
        return list(set([allergy.name for allergy in self.allergies])) + self.menu_item_names + self.menu_item_descriptions

    # # Translate Allergies Method
    # def get_t_allergies(self, lang='en'):
    #     translator.target = lang
    #     return [translator.translate(allergy.name) for allergy in self.allergies]






class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menu_items'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    vegan = db.Column(db.Boolean)
    kosher = db.Column(db.Boolean)

    # serialize_rules = ('-restaurant.menu_items',)
    serialize_rules = ('-allergies.menu_item', '-restaurant', '-restaurant_id', '-menu_item_allergies', '-restuarant.menu_items', 'allergies')

    restaurant = db.relationship('Restaurant', back_populates='menu_items')
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), index=True)

    menu_item_allergies = db.relationship('MenuItemAllergy', back_populates='menu_item')
    allergies = association_proxy('menu_item_allergies', 'allergy')




    # # Translate Name Method
    # def get_t_name(self, lang='en'):
    #     translator.target = lang
    #     return translator.translate(self.name)
    #     # return [translator.translate(allergy.name) for allergy in self.allergies]

    # # Translate Description Method
    # def get_t_description(self, lang='en'):
    #     translator.target = lang
    #     return translator.translate(self.description)
    #     # return [translator.translate(allergy.name) for allergy in self.allergies]






class Allergy(db.Model, SerializerMixin):
    __tablename__ = 'allergies'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    removable = db.Column(db.Boolean)

    serialize_rules = ('-menu_item_allergies', '-order_item_allergies')



    menu_item_allergies = db.relationship('MenuItemAllergy', back_populates='allergy')
    order_item_allergies = db.relationship('OrderItemAllergy', back_populates='allergy')


    # # Allergy Translator
    # def get_t_allergy(self, lang):
    #     translator.target = lang
    #     return translator.translate(self.name)



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password_hash = db.Column(db.String)
    role = db.Column(db.String)

    serialize_rules = ('-password_hash',)
    
    restaurant = db.relationship('Restaurant', back_populates='users')
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))










class MenuItemAllergy(db.Model, SerializerMixin):
    __tablename__ = 'menu_item_allergies'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)

    serialize_rules = ('-allergy.menu_item_allergies', '-menu_item.menu_item_allergies', '-id', '-allergy_id', '-menu_item_id')

    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'))
    menu_item = db.relationship('MenuItem', back_populates='menu_item_allergies')

    allergy_id = db.Column(db.Integer, db.ForeignKey('allergies.id'))
    allergy = db.relationship('Allergy', back_populates='menu_item_allergies')


# The Order Models

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    order_items = db.relationship('OrderItem', back_populates='order')

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    notes = db.Column(db.String)
    quantity = db.Column(db.Integer)

    serialize_rules = ('-order', 'allergies', '-order_item_allergies', '-order_id')

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    order = db.relationship('Order', back_populates='order_items')
    order_item_allergies = db.relationship('OrderItemAllergy', back_populates='order_item')
    allergies = association_proxy('order_item_allergies', 'allergy')

class OrderItemAllergy(db.Model, SerializerMixin):
    __tablename__ = 'order_item_allergies'

    # DB Setup
    id = db.Column(db.Integer, primary_key=True)

    serialize_rules = ('-order_item', '-order_item_id', '-allergy_id')

    allergy_id = db.Column(db.Integer, db.ForeignKey('allergies.id'))
    allergy = db.relationship('Allergy', back_populates='order_item_allergies')

    order_item_id = db.Column(db.Integer, db.ForeignKey('order_items.id'))
    order_item = db.relationship('OrderItem', back_populates='order_item_allergies')






