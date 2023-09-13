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
        ['Axe Sandwich', 'Axe Salad', 'Axe Pasta', 'Axe Soda', 'Axe Cake', "Axe Sushi Roll", 'Axe Milkshake', "'Mo Axes; 'Mo Problems"],
        ['Miso Soup', 'Minestrone', 'N.E. Clam Chowder', 'Manhattan Clam Chowder', "French Onion", "Side of Bread", 'Garden Salad', 'Chocolate Chip Cookies']
    ]
    restaurant_1 = [
    'Delicious Spaghetti Pasta in a beef bolognese sauce',
    'Fresh Mozzarella on a warm golden baked crust in a tomato-sauce that would make your grandmother proud',
    'Creamy alfredo sauce generously poured over grilled chicken and sprinkled with savory parmesan on top',
    'A generous side of bread smothered in garlic butter',
    'Rich buttery pasta tossed in house-made marinara with hints of basil',
    'Crisp tomato and fresh mozarella sliced layed one atop the other and dressed in extra virgin olive oil and balsamic vinagarette',
    'A warm vegetable soup perfect for the NY winter',
    'Traditional tiramisu made of coffee-dipped ladyfingers and mascarpone cheese, lightly dusted with cocoa powder'
    ]
    restaurant_2 = [
    "Sweet and Tangy Orange Chicken with Bok Choy",
    "Savory Lo-Mein Noodles with Fresh Vegetables",
    "Tender Wasabi-Crusted Filet Mignon with Garlic Mash",
    "Spicy Kung Pao Chicken with Peanuts and Bell Peppers",
    "Iconic General Tso's Chicken with Broccoli",
    "Warm and Comforting Miso Soup with Tofu and Seaweed",
    "Fortune Cookies with Fun and Prophetic Messages",
    "Fresh and Flavorful Sushi Rolls with Wasabi and Soy Sauce"
    ]
    restaurant_3 = [
    "Tender Filet Mignon, seared to perfection and served with a rich red wine reduction sauce",
    "Juicy Sirloin Steak, grilled to your liking and garnished with sautéed mushrooms and onions",
    "Freshly Baked Bread, warm and crusty, served with whipped garlic butter",
    "Crisp Side Salad, featuring mixed greens, cherry tomatoes, and balsamic vinaigrette dressing",
    "Classic Hamburger, a mouthwatering beef patty with all your favorite toppings",
    "The Best Steak Ever, a chef's special cut, grilled and seasoned to perfection",
    "New York Strip Steak, a flavorful and tender cut with a savory peppercorn sauce",
    "Decadent Chocolate Cake, a rich and indulgent dessert topped with a scoop of vanilla ice cream"
    ]
    restaurant_4 = [
    "The Burger, a classic choice featuring a juicy beef patty, lettuce, tomato, and our secret sauce on a toasted bun",
    "A Better Burger, a premium option with double beef patties, crispy bacon, cheddar cheese, and a smoky barbecue sauce",
    "The Garden Burger, a delightful vegetarian option with a homemade veggie patty, fresh lettuce, and tangy aioli",
    "Side of Fries, a golden and crispy side dish, seasoned to perfection and served with ketchup",
    "Chocolate Shake, a heavenly dessert beverage, made with rich chocolate ice cream and whipped cream",
    "Tater Tots, bite-sized and crispy potato goodness, perfect for sharing or indulging on your own",
    "Bacon Burger, a flavorful twist on the classic burger, featuring a beef patty, crispy bacon, and special sauce",
    "Veggie Burger, a wholesome vegetarian alternative with a grilled vegetable patty, avocado, and garlic aioli"
    ]
    restaurant_5 = [
    "Burrito al Pastor, a flavorful delight filled with marinated pork, onions, and pineapple, wrapped in a warm tortilla",
    "Shrimp Tacos, a taste of the sea with tender shrimp, fresh salsa, and zesty lime, served in soft corn tortillas",
    "Menudo, a hearty Mexican soup with tripe and hominy, simmered to perfection in a savory broth",
    "Ceviche, a refreshing dish featuring diced seafood marinated in citrus juices, mixed with tomatoes, onions, and cilantro",
    "Chicken Tacos, succulent grilled chicken served in warm tortillas, garnished with lettuce, cheese, and salsa",
    "Duck Tacos, an exquisite treat showcasing tender duck meat, pickled onions, and a drizzle of chipotle sauce",
    "Side of Rice and Beans, the perfect accompaniment with fluffy rice and flavorful beans, a classic Mexican duo",
    "Horchata, a traditional sweet rice milk beverage with hints of cinnamon and vanilla, a cool and refreshing choice"
    ]
    restaurant_6 = [
    "Branzino, a delicate Mediterranean sea bass, grilled to perfection with a touch of olive oil and herbs",
    "Chilean Sea Bass, a premium white fish known for its buttery texture and rich flavor, a seafood lover's dream",
    "Mussels, succulent morsels from the sea, bathed in a savory broth with garlic, wine, and fresh herbs",
    "Oysters, briny gems from the ocean, served on the half-shell with a squeeze of lemon and a dash of hot sauce",
    "King Crab Legs, a seafood feast fit for royalty, featuring colossal crab legs, steamed to sweet and tender perfection",
    "Shrimp Cocktail, jumbo shrimp served chilled with tangy cocktail sauce, a classic appetizer with a zesty kick",
    "Fried Shrimp, crispy and golden, these succulent shrimp are perfect for dipping in a creamy garlic aioli",
    "Garlic Bread, warm and aromatic, a side of oven-toasted bread slathered in butter and garlic, a comfort food favorite"
    ]
    restaurant_7 = [
    "Axe Sandwich, a hearty stack of deli meats and fresh veggies, packed between slices of artisanal bread",
    "Axe Salad, a crisp and refreshing mix of garden greens, tossed with your choice of homemade dressings",
    "Axe Pasta, pasta perfection served with your favorite sauces and garnished with Parmesan cheese",
    "Axe Soda, a fizzy and thirst-quenching beverage selection with a variety of flavors to choose from",
    "Axe Cake, a delectable slice of cake, rich and sweet, served with a scoop of creamy vanilla ice cream",
    "Axe Sushi Roll, a sushi lover's dream, featuring fresh fish, avocado, and rice, rolled to perfection",
    "Axe Milkshake, a creamy and indulgent treat, blended with your choice of flavors and toppings",
    "'Mo Axes; 'Mo Problems, an adventurous platter of assorted dishes, the ultimate feast for axe enthusiasts"
    ]
    restaurant_8 = [
    "Miso Soup, a warm and savory Japanese classic, made with soybean paste and seaweed",
    "Minestrone, a hearty Italian vegetable soup, bursting with flavor and pasta",
    "N.E. Clam Chowder, a creamy New England favorite, brimming with tender clams and potatoes",
    "Manhattan Clam Chowder, a tomato-based delight, featuring fresh clams and a hint of spice",
    "French Onion, a timeless soup, topped with melted cheese and toasted bread for a rich, savory taste",
    "Side of Bread, a delightful selection of freshly baked bread to accompany your meal",
    "Garden Salad, a crisp and colorful medley of fresh greens, veggies, and your choice of dressing",
    "Chocolate Chip Cookies, classic homemade cookies, warm and gooey, with plenty of chocolate chips"
    ]
    descriptions = [restaurant_1, restaurant_2, restaurant_3, restaurant_4, restaurant_5, restaurant_6, restaurant_7, restaurant_8]



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


    menu_items = []
    for i in range(8):
        for j in range(8):
            menu_item = MenuItem(
                name = menu_item_arrays[i][j],
                description = descriptions[i][j],
                vegan = fake.boolean(),
                kosher = fake.boolean(),
                restaurant = restaurants[i],
            )
            menu_items.append(menu_item)
    db.session.add_all(menu_items)
    db.session.commit()

    menu_item_allergies = []
    for i in range(120):
        menu_item_allergy = MenuItemAllergy(
            allergy = choice(allergies),
            menu_item = choice(menu_items)
        )
        menu_item_allergies.append(menu_item_allergy)
    db.session.add_all(menu_item_allergies)
    db.session.commit()

