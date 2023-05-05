import os
from flask import Flask, request, make_response, session, redirect, render_template, json, jsonify
from googletrans import Translator
from sqlalchemy.orm import noload
from flask_restful import Api, Resource
from data_sets import ingredient_names
from config import app, db
from dotenv import load_dotenv
import stripe

from models import db, Restaurant, MenuItem, Allergy, Order, OrderItem, OrderItemAllergy, User, MenuItemAllergy

load_dotenv()
stripe.api_key = os.environ.get('STRIPE_API_KEY')
api = Api(app)
app.secret_key = os.environ.get('APP_SECRET_KEY')



# Basic Route for setup 
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")



# Manager / Restaurant Routes (RESTful)

# Restaurant Routes
class Restaurants(Resource):

    def get(self):
        restaurants = Restaurant.query.all()
        restaurant_list = [restaurant.to_dict(
            only=('id', 'name', 'url')
        ) for restaurant in restaurants]
        return make_response(restaurant_list, 200)


    def post(self):
        data = request.get_json()

        # Initialize Restaurant
        rest =  Restaurant.query.filter(Restaurant.name == data['restaurantName']).first()
        if rest:
            return make_response({'error': 'Restaurant Name is already taken'}, 422)
        user = User.query.filter(User.username == data['username']).first()
        if user:
            return make_response({'error': 'Username already taken'}, 422)

        new_restaurant = Restaurant(
            name = data['restaurantName'],
        )
        try:
            db.session.add(new_restaurant)
            db.session.commit()
        except:
            print('error 1')
            return make_response({'error': 'Resource not created'}, 422)

        # Initialize First Administrator
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
            print('error 2')
            return make_response({'error': 'Resource not created'}, 422)
        session['user_id'] = new_user.id
        session['role'] = new_user.role
        return make_response(new_restaurant.to_dict(), 201)

    def delete(self):
        id = request.get_json()
        restaurant = Restaurant.query.filter(Restaurant.id == id).first()
        try:
            db.session.delete(restaurant)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to delete Resource'}, 422)
        session['user_id'] = None
        session['role'] = None
        
        return make_response({}, 204)


api.add_resource(Restaurants, '/restaurants')

class RestaurantById(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if not user:
            return make_response({'error': 'Unauthorized'}, 401)

        restaurant = Restaurant.query.filter(Restaurant.id == user.restaurant.id).first()
        restaurant_dict = restaurant.to_dict(rules=('-users',))
        return make_response(restaurant_dict, 200)

    def patch(self):
        data = request.get_json()

        # Get Restaurant
        restaurant = Restaurant.query.filter(Restaurant.id == data['restaurantID']).first()
        if not restaurant:
            return make_response({'error': 'Invalid Restaurant Name'}, 422)

        # Validate Administrator Credentials
        user = User.query.filter(User.username == data['username']).first()
        if not user:
            return make_response({'error': 'Invalid user credentials'}, 422)
        if not user.authenticate(data['password']):
            return make_response({'error': 'Unauthorized'}, 401)
        if not user.role == 'administrator':
            return make_response({'error': 'Unauthorized'}, 401)



        for attr in data:
            if not attr == 'restaurantID':
                if data[attr]:
                    setattr(restaurant, attr, data[attr])
        try:
            db.session.add(restaurant)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to update Resource'}, 422)

        restaurant_dict = restaurant.to_dict(rules=('-users',))
        return make_response(restaurant_dict, 200)


api.add_resource(RestaurantById, '/restaurant')


# Items Routes

class Items(Resource):
    def post(self, restaurant_id):
        restaurant = Restaurant.query.filter(Restaurant.id == restaurant_id).first()
        data = request.get_json()

        item = MenuItem.query.filter(MenuItem.name == data['name'], restaurant.id == MenuItem.restaurant_id).first()
        if item:
            return make_response({'error': 'Cannot make two items with the exact same name'}, 422)

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

    # This is the view for adding allergies onto the item

    def post(self, restaurant_id, item_id):
        data = request.get_json()
        menu_item = MenuItem.query.filter(MenuItem.id == item_id).first()
        print('All Data:')
        print(data)
        print('Current MenuItem:')
        print(menu_item.to_dict())
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

                # Persist Connection
                new_joint = MenuItemAllergy(
                    menu_item = menu_item,
                    allergy = existing_allergy
                )
                try:
                    db.session.add(new_joint)
                    db.session.commit()
                    print('saved pre-existing allergy"s connection in db')
                except:
                    return make_response({'error': 'Failed to create resource'}, 422)

            # If the allergy does not already exist
            if not existing_allergy:
                # Create new Allergy
                new_allergy = Allergy(
                    name = allergy['name'],
                    removable = allergy['removable']
                )
                try:
                    db.session.add(new_allergy)
                    db.session.commit()
                except:
                    return make_response({'error': 'Failed to add allergy'})
    
                # Persist information
                new_joint = MenuItemAllergy(
                    menu_item = menu_item,
                    allergy = new_allergy
                )
                try:
                    db.session.add(new_allergy)
                    db.session.add(new_joint)
                    db.session.commit()
                    print('saved new allergy in db')
                except:
                    return make_response({'error': 'Failed to create resource'}, 422)

        updated_item = MenuItem.query.filter(MenuItem.id == menu_item.id).first()
        response_list = [allergy.to_dict() for allergy in updated_item.allergies]
        # print(response_list)
        return make_response(response_list, 200)


    def patch(self, restaurant_id, item_id):
        data = request.get_json()
        print(data)
        menu_item = MenuItem.query.filter(MenuItem.id == item_id).first()

        # Update the attributes
        if data['description']:
            menu_item.description = data['description']
        if data['name']:
            menu_item.name = data['name']
        menu_item.kosher = data['kosher'] 
        menu_item.vegan = data['vegan']


        try:
            db.session.add(menu_item)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to update Resource'}, 422)

        # Update the allergies
        for allergy in data['allergies']:
            # Query for link
            link_instance = MenuItemAllergy.query.filter(
                allergy['id'] == MenuItemAllergy.allergy_id,
                menu_item.id == MenuItemAllergy.menu_item_id
            ).first()
            print(link_instance)
            try:
                db.session.delete(link_instance)
                db.session.commit()
            except:
                return make_response({'error': 'Failed to delete Resource'}, 422)
        return make_response(menu_item.to_dict(), 200)

    def delete(self, restaurant_id, item_id):
        item = MenuItem.query.filter(MenuItem.id == item_id).first()
        try:
            db.session.delete(item)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to delete Resource'}, 422)
        return make_response({}, 204)

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

# Custom given the nature of the request
@app.route('/<int:id>/users')
def get_users(id):
    if request.method == 'GET':
        users = User.query.filter(User.restaurant_id == id).all()
        user_list = [user.to_dict(only=('id', 'username', 'role', 'restaurant_id')) for user in users]
        return make_response(user_list, 200)


class UserByID(Resource):
    def patch(self, id):
        data = request.get_json()
        print(data)
        user = User.query.filter(User.id == id).first()
        for attr in data:
                if data[attr]:
                    setattr(user, attr, data[attr])
        try:
            db.session.add(user)
            db.session.commit()
        except:
            return make_response({'error': 'Failed to update resource'}, 422)
        return make_response(user.to_dict(only=('username', 'role', 'id')), 200)


api.add_resource(UserByID, '/users/<int:id>')



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
        if not user.authenticate(data['password']):
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

        # If in english
        if lang == 'en' and restaurant:
            return make_response(restaurant.to_dict(rules=('-users',)), 200)

        # Google Translate
        google_translator = Translator()
        for item in restaurant.menu_items:
            item.name = google_translator.translate(item.name, src='en', dest=lang).text
            item.description = google_translator.translate(item.description, src='en', dest=lang).text
            for allergy in item.allergies:
                allergy.name = google_translator.translate(allergy.name, src='en', dest=lang).text

        response = make_response(restaurant.to_dict(rules=('-users',)), 200)

        return response





# Stripe Routes

# This is the route called on in the Product display page
@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    user = User.query.filter(User.id == session['user_id']).first()
    if not user.role == 'administrator':
        return make_response({'error': "Unauthorized"}, 401)

    try:
        prices = stripe.Price.list(
            lookup_keys=[request.form['lookup_key']],
            expand=['data.product']
        )
        # The Checkout Session object
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price': 'price_1N3tjYDA7GByIJ4jT352zmv1',
                    # 'price': prices.data[0].id,
                    'quantity': 1,
                },
            ],
            metadata={
                "user_id": session['user_id']
            },
            mode='subscription',
            success_url='http://localhost:4000/manage/subscription/',
            cancel_url='http://localhost:4000/manage/subscription/' + '?canceled=true',
            subscription_data={
                'trial_period_days': 14
            },
        )
        # print('----this is the checkout session object--------')
        # print(checkout_session)
        return redirect(checkout_session.url, code=303)
    except Exception as e:
        print(e)
        return "Server error", 500



# This is the route called in the success page
@app.route('/create-portal-session', methods=['POST'])
def customer_portal():
    # For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    # Typically this is stored alongside the authenticated user in your database.

    # checkout_session_id = request.form.get('session_id')
    # checkout_session = stripe.checkout.Session.retrieve(checkout_session_id)

    user = User.query.filter(User.id == session['user_id']).first()
    # print(user.to_dict())
    if not user.role == 'administrator':
        return make_response({'error': "Unauthorized"}, 401)

    customer_id = Restaurant.query.filter(
        Restaurant.id == user.restaurant_id
    ).first().stripe_customer_id
    print(customer_id)
    
    return_url = 'http://localhost:4000/manage/subscription'

    print('beginning portal session')
    portalSession = stripe.billing_portal.Session.create(
        # customer=checkout_session.customer,
        customer=customer_id,
        return_url=return_url,
    )
    print(portalSession.url)
    return make_response({"url": portalSession.url}, 303)
    # return redirect(portalSession.url, code=303)



# This is the route designed for the webhook to update my db with the necessary information
@app.route('/stripe-update-databse', methods=['POST'])
def stripe_webhook():
    webhook_secret = os.environ.get('STRIPE_WEBHOOK_SECRET')
    request_data = json.loads(request.data)
    # print('request_data from the webhook--------------------------------')
    # print(request_data)
    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    # The three options based on whether or not it was successful

    if event_type == 'checkout.session.completed':
    # Payment is successful and the subscription is created.
    # You should provision the subscription and save the customer ID to your database.

        # print('checkout.session.completed data--------------------------------')
        # print("The Users ID")
        # print(data.object.metadata)
        # print('The Customer ID from Stripe')
        # print(data.object.customer)

        restaurant = Restaurant.query.filter(
            Restaurant.id == User.query.filter(User.id == data.object.metadata['user_id']).first().restaurant_id
        ).first()

        restaurant.stripe_customer_id = data.object.customer
        restaurant.stripe_status = 'trial'
        try:
            db.session.add(restaurant)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify({'status': 'failed'})
    
    elif event_type == 'invoice.paid':
    # Continue to provision the subscription as payments continue to be made.
    # Store the status in your database and check when a user accesses your service.
    # This approach helps you avoid hitting rate limits.
        print('invoice.paid data--------------------------------')
        print(data)

    elif event_type == 'invoice.payment_failed':
    # The payment failed or the customer does not have a valid payment method.
    # The subscription becomes past_due. Notify your customer and send them to the
    # customer portal to update their payment information.
        print('invoice.payment_failed data --------------------------------')
        print(data)

    elif event_type == 'customer.subscription.created':
        print('ignore below')
        print('customer.subscription.created data --------------------------------')
        # print(data)
        # This variable is the customers id number
        # print('this is the customers id number')
        # print(data.object.customer)
        # print('this is the metadata object received back')
        # print(data.object.metadata)


    else:
        print('Unhandled event type {}'.format(event_type))

    return jsonify({'status': 'success'})



@app.route('/get-stripe-status', methods=['POST'])
def get_status():
    rest_id = request.get_json()
    print('the rest id')
    print(rest_id)
    stripe_status = Restaurant.query.filter(Restaurant.id == rest_id).first().stripe_status
    print(stripe_status)
    if not stripe_status:
        return make_response({'status': "none"})
    else:
        return make_response({'status': stripe_status}, 200)





if __name__ == '__main__':
    app.run(port=5555, debug=True)