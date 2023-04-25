import os

from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from deep_translator import GoogleTranslator
from sqlalchemy.orm import noload
from flask_restful import Api, Resource
# from data_sets import allergy_dictionary
# from flask_cors import CORS

from models import db, Restaurant, MenuItem, Allergy, Order, OrderItem, OrderItemAllergy, User

app = Flask(__name__)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rlgallegos85:MzXYvPcBwXVyQy43aTFxA02hmyHEkWyB@dpg-cgngl8bldisfgrv47mpg-a.ohio-postgres.render.com/dbcapstone_yi94'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

app.secret_key = 'bobbyisthebest'

translator = GoogleTranslator(source='en', target='en')

# Manager / Restaurant Routes (RESTful)

class Restaurants(Resource):
    def post(self):
        data = request.get_json()
        if Restaurant.query.filter(Restaurant.name == data['restaurantName']):
            return make_response({'error': 'Restaurant Name is already taken'}, 422)
        new_restaurant = Restaurant(
            name = data['restaurantName']
        )
        try:
            db.session.add(new_restaurant)
            db.session.commit()
        except:
            return make_response({'error': 'Resource not created'}, 422)
        print(new_restaurant.to_dict())
        new_user = User(
            username = data['username'],
            password_hash = data['password'],
            restaurant = new_restaurant,
            role = 'administrator'
        )
        print(new_user.to_dict())
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({'error': 'Resource not created'}, 422)
        session['user_id'] = new_user.id
        session['role'] = new_user.role
        return make_response(new_restaurant.to_dict(), 201)

api.add_resource(Restaurants, '/restaurants')


class RestaurantById(Resource):

    def get(self, restaurant_id):
        restaurant = Restaurant.query.filter(Restaurant.id == restaurant_id).first()
        print(restaurant)
        restaurant_dict = restaurant.to_dict(rules=('-users',))
        return make_response(restaurant_dict, 200)

    def post(self, restaurant_id):
        # This will need to be done once the front-end decides how to format the 'data' json obj
        pass
    def patch(self, restaurant_id):

        pass
    def delete(self, restaurant_id):
        pass

api.add_resource(RestaurantById, '/restaurants/<int:restaurant_id>')

class ItemByID(Resource):
    def get(self, restaurant_id, item_id):
        pass
    def patch(self, restaurant_id, item_id):
        pass
    def delete(self, restaurant_id, item_id):
        pass

api.add_resource(ItemByID, '/restaurants/<int:restaurant_id>/items/<int:item_id>')

class Orders(Resource):
    def post(self):
        data = request.get_json()
        # Create new order
        new_order = Order()
        db.session.add(new_order)
        db.session.commit()
        # Create new order items
        new_order_item_list = []
        for order_item in data:
            new_order_item = OrderItem(
                order = new_order,
                name = MenuItem.query.filter(MenuItem.id == order_item['item']['id']).first().name,
                notes = order_item['notes'],
                quantity = order_item['quantity'],
            )
            new_order_item_list.append(new_order_item)
            # Create new order item allergies
            new_order_item_allergy_list = []
            for allergy in order_item['filters']:
                new_order_item_allergy = OrderItemAllergy(
                    order_item = new_order_item,
                    allergy = Allergy.query.filter(Allergy.id == allergy['id']).first()
                )
                new_order_item_allergy_list.append(new_order_item_allergy)
                db.session.add(new_order_item_allergy)
                db.session.commit()
            db.session.add(new_order_item)
            db.session.commit()

        try:
            # db.session.add(new_order)
            db.session.add_all(new_order_item_list)
            db.session.add_all(new_order_item_allergy_list)
            db.session.commit()
        except:
            return make_response({'error': 'Resource note created'}, 422)
        return make_response(new_order.to_dict(), 201)

api.add_resource(Orders, '/orders')


# Authorization Routes

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': 'Unauthorized'}, 401)
        else:
            return make_response(user.restaurant.to_dict(), 200)

api.add_resource(CheckSession, '/check_session')




# Guest / Server Routes

# @app.route('/<int:id>/<string:lang>/items')
# def menu(id, lang):
#     if request.method == 'GET':
#         # translated_dict = [{key: GoogleTranslator(source='en', target=lang).translate(value)} for key, value in allergy_dictionary.items()]
#         # for element in translated_dict:
#         #     print(element)

#         translated_dict = {}
#         for key, value in allergy_dictionary.items():
#             translated_dict[key] = GoogleTranslator(source='en', target=lang).translate(value)

#         # print(translated_dict)
        
#         # print(allergy_dictionary)
#         # print(new_dict)

#             # Query for Menu Items
#         menu_items = MenuItem.query.filter(MenuItem.restaurant_id == id).options(noload(MenuItem.restaurant)).all()

#         # Translate all Menu Item attributes
#         for menu_item in menu_items:

#             # name = [GoogleTranslator(source='en', target=lang).translate(menu_item.name) for menu_item in ]
#             menu_item.name = GoogleTranslator(source='en', target=lang).translate(menu_item.name)
#             menu_item.description = GoogleTranslator(source='en', target=lang).translate(menu_item.description)
#             # menu_item.name = translated_name
#             # menu_item.description = translated_description
#             # menu_item = menu_item.to_dict()
    
#             # Translate all Allergies
#             for allergy_object in menu_item.allergies:
#                 allergy_object.name = translated_dict[allergy_object.name]


#             # menu_item.allergies = [ { allergy_object.name: translated_dict[allergy_object.name] } for allergy_object in menu_item.allergies ]

#         menu_items_dict_list = [menu_item.to_dict() for menu_item in menu_items]
#         response = make_response(menu_items_dict_list, 200)
#         return response


@app.route('/<int:id>/<string:lang>/items/')

@app.route('/<int:id>/<string:lang>/items')
def menu(id, lang):
    if request.method == 'GET':
        translator.target = lang

        restaurant = Restaurant.query.filter(Restaurant.id == id).first()

        # Create translation dictionary
        allergy_dictionary = {}
        for allergy in restaurant.allergies:
            allergy_dictionary[allergy.name] = translator.translate(allergy.name)


        for allergy in restaurant.allergies:
            allergy.name = allergy_dictionary[allergy.name]

        for menu_item in restaurant.menu_items:
            menu_item.name = translator.translate(menu_item.name)
            menu_item.description = translator.translate(menu_item.description)
            
            # for allergy in menu_item.allergies:
            #     allergy.name = allergy_dictionary[allergy.name]
        

        # translated_dict = {}
        # for key, value in allergy_dictionary.items():
        #     translated_dict[key] = translator.translate(value)

        # # Query for Menu Items and serialize
        # menu_items = MenuItem.query.filter(MenuItem.restaurant_id == id).options(noload(MenuItem.restaurant)).all()
        # menu_items_dict_list = [menu_item.to_dict() for menu_item in menu_items]

        # # Translate all Menu Item attributes
        # for menu_item in menu_items_dict_list:

        #     menu_item['name'] = translator.translate(menu_item['name'])
        #     menu_item['description'] = translator.translate(menu_item['description'])
    
        #     # Translate all Allergies
        #     # for allergy_object in menu_item['allergies']:
        #     #     allergy_object['name'] = translated_dict[allergy_object['name']]

        response = make_response(restaurant.to_dict(rules=('-users',)), 200)

        return response








if __name__ == '__main__':
    app.run(port=5555, debug=True)