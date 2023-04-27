import os

from flask import Flask, request, make_response, session
from flask_migrate import Migrate
from deep_translator import GoogleTranslator
from sqlalchemy.orm import noload
from flask_restful import Api, Resource
from data_sets import ingredient_names
# from flask_cors import CORS

from models import db, Restaurant, MenuItem, Allergy, Order, OrderItem, OrderItemAllergy, User, MenuItemAllergy

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

# Restaurant Routes
class Restaurants(Resource):

    def get(self):
        restaurants = Restaurant.query.all()
        restaurant_list = [restaurant.to_dict(
            only=('id', 'name')
        ) for restaurant in restaurants]
        return make_response(restaurant_list, 200)


    def post(self):
        data = request.get_json()

        # # Associate Basic Allergies with current 
        # allergy_list = []
        # for ingredient in ingredient_names:
        #     found_allergy = Allergy.query.filter(Allergy.name == ingredient).first()
        #     allergy_list.append(found_allergy)

        # Initialize Restaurant
        rest =  Restaurant.query.filter(Restaurant.name == data['restaurantName']).first()
        if rest:
            return make_response({'error': 'Restaurant Name is already taken'}, 422)
        new_restaurant = Restaurant(
            name = data['restaurantName'],
            allergies = allergy_list
        )
        try:
            db.session.add(new_restaurant)
            db.session.commit()
        except:
            return make_response({'error': 'Resource not created'}, 422)

        # Initialize Administrator
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
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': 'Unauthorized'}, 401)

        restaurant = Restaurant.query.filter(Restaurant.id == user.restaurant.id).first()
        restaurant_dict = restaurant.to_dict(rules=('-users',))
        return make_response(restaurant_dict, 200)

api.add_resource(RestaurantById, '/restaurant')


# Items Routes

class Items(Resource):
    def post(self, restaurant_id):
        restaurant = Restaurant.query.filter(Restaurant.id == restaurant_id).first()
        data = request.get_json()
        new_item = MenuItem(
            name = data['name'],
            description = data['description'],
            kosher = data['kosher'],
            vegan = data['vegan'],
            restaurant = restaurant
        )
        try:
            db.session.add(new_item)
            db.session.commit()
        except:
            return make_response({'error': 'Resource not created'}, 422)
        return make_response(new_item.to_dict(), 201)


api.add_resource(Items, '/restaurants/<int:restaurant_id>/items')

class ItemByID(Resource):
    def get(self, restaurant_id, item_id):
        pass


    def patch(self, restaurant_id, item_id):
        data = request.get_json()
        menu_item = MenuItem.query.filter(MenuItem.id == item_id).first()
        print(data)
        new_allergy_list = []
        total_allergy_list = []
        for allergy in data:
            # Query to see if the allergy exists already
            existing_allergy = Allergy.query.filter(
                Allergy.name == allergy['name'],
                Allergy.removable == allergy['removable']
                ).first()
            # If the allergy already exists
            if existing_allergy:
                new_joint = MenuItemAllergy(
                    menu_item = menu_item,
                    allergy = existing_allergy
                )
            # If the allergy does not already exist
            if not existing_allergy:
                new_allergy = Allergy(
                    name = allergy['name'],
                    removable = allergy['removable']
                )
                new_joint = MenuItemAllergy(
                    menu_item = menu_item,
                    allergy = new_allergy
                )
                # Persist information
                try:
                    db.session.add(new_allergy)
                    db.session.add(new_joint)
                    db.session.commit()
                except:
                    return make_response({'error': 'failed to create resource'}, 422)


        response_list = [allergy.to_dict() for allergy in menu_item.allergies]
        print(response_list)
        return make_response(response_list, 200)
        



    def delete(self, restaurant_id, item_id):
        pass

api.add_resource(ItemByID, '/restaurants/<int:restaurant_id>/items/<int:item_id>')


# User Routes
class Users(Resource):
    def post(self):
        data = request.get_json()
        print(data)
        new_user = User(
            username = data['username'],
            password_hash = data['password'],
            restaurant_id = data['restID'],
            role = data['role']
        )
        try:
            db.session.add(new_user)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to create resource'}, 422)
        return make_response(new_user.to_dict(only=('username', 'role', 'id')), 201)

api.add_resource(Users, '/users')


# class UserByID(Resource):
#     def get(self, id):
#         user = User.query.filter(User.id == id).first()
#         return make_response(user.to_dict(), 200)

# api.add_resource(UserByID, '/users/<int:id>')

# Authorization Routes

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': 'Unauthorized'}, 401)
        else:
            return make_response(user.to_dict(), 200)
api.add_resource(CheckSession, '/check_session')

class Logout(Resource):
    def delete(self):
        try:
            session['user_id'] = None
            session['role'] = None
        except:
            return make_response({'error': 'Logout failed'})
        return make_response({}, 204)
api.add_resource(Logout, '/logout')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
        if not user:
            return make_response({'error': 'User not found'}, 422)
        if not user.password_hash == data['password']:
            return make_response({'error': 'Unauthorized'}, 401)
        session['user_id'] = user.id
        session['role'] = user.role
        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')



# Guest / Server Routes

# Order Routes

class Orders(Resource):
    def get(self):
        # EVENTUALLY HERE WILL GO THE LOGIC TO ALLOW A SERVER TO RETRIEVE THE ORDER
        pass

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



# Translation Route

@app.route('/<int:id>/<string:lang>/items')
def menu(id, lang):
    if request.method == 'GET':
        restaurant = Restaurant.query.filter(Restaurant.id == id).first()

        #If in english
        if lang == 'en' and restaurant:
            return make_response(restaurant.to_dict(rules=('-users',)), 200)


        
        # # TRANSLATION ATTEMPT 3 (USING PROPERTIES)

        # print('starting translation')
        # for menu_item in restaurant.menu_items:
        #     print('translating new menu item')
        #     menu_item.name = menu_item.get_t_name(lang)
        #     menu_item.description =menu_item.get_t_description(lang)
        #     for allergy in menu_item.allergies:
        #         print('translating allergy')
        #         allergy.name = allergy.get_t_allergy(lang)

    
        # return restaurant.to_dict(), 200




        # TRANSLATION ATTEMPT 2
        translator.target = lang

        # print(translator.translate_batch(restaurant.menu_item_names))
   
        # print(restaurant.allergy_names)
        # print(restaurant.menu_item_names)
        # terms = restaurant.allergy_names + restaurant.menu_item_names + restaurant.menu_item_descriptions
        # print(terms)
        # translated_terms = translator.translate_batch(terms)
        # print(translated_terms)


        allergy_word_list = restaurant.allergy_names
        name_word_list = restaurant.menu_item_names
        description_word_list = restaurant.menu_item_descriptions


        # Create translation dictionary
        print('creating allergy dictionary')
        allergy_dictionary = {}
        t_allergy_terms = translator.translate_batch(allergy_word_list)
        print('finished translating allergy terms')
        for i in range(len(t_allergy_terms)):
            allergy_dictionary[allergy_word_list[i]] = t_allergy_terms[i]

        print(allergy_word_list)

        # for allergy in restaurant.terms:
        #     print('translating dictionary entry')
        #     allergy_dictionary[allergy.name] = translator.translate(allergy.name)

        print('creating name dictionary')
        name_dictionary = {}
        t_name_terms = translator.translate_batch(name_word_list)
        for i in range(len(t_name_terms)):
            name_dictionary[name_word_list[i]] = t_name_terms[i]

        print('creating description dictionary')
        description_dictionary = {}
        t_description_terms = translator.translate_batch(description_word_list)
        for i in range(len(t_description_terms)):
            description_dictionary[description_word_list[i]] = t_description_terms[i]


    

        print('applying allergy dictionary')
        for allergy in restaurant.allergies:
            allergy.name = allergy_dictionary[allergy.name]


        print('applying name/description dictionary')
        for menu_item in restaurant.menu_items:
            menu_item.name = name_dictionary[menu_item.name]
            menu_item.description = description_dictionary[menu_item.description]


        # for menu_item in restaurant.menu_items:
        #     print('translating menu item')
        #     menu_item.name = translator.translate(menu_item.name)
        #     menu_item.description = translator.translate(menu_item.description)




        # TRANSLATION ATTEMPT 1


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