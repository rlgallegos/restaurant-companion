from app import app

from models import MenuItem, MenuItemAllergy, Restaurant




with app.app_context():
    menu_items = MenuItem.query.all()
    menu_item = menu_items[-1]

    print(menu_item.to_dict(only=("name", "id")))
    for allergy in menu_item.allergies:
        print(allergy.to_dict())