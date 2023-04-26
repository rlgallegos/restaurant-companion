from models import Allergy

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

food = ['Orange Chicken', 'Wasabi Crusted Filet', 'Grilled Branzino', 'Fried Rice', 'Lo Mein', 'Omakase', 'Vegetable Dumplings', 'Gyoza', 'Egg Rolls']

ingredient_names = [
    'gluten',
    'garlic',
    'fish',
    'onion',
    'msg',
    'peanuts',
    'soy',
    'sesame',
    'tree nuts',
    'shellfish',
    'shrimp',
    'dairy',
    'egg'
]

for ingredient in ingredient_names:
    new_allergy_object = Allergy(
        name = ingredient,
        removable = True
    )



allergy_dictionary = {
    'garlic': 'garlic',
    'fish': 'fish',
    'onion': 'onion',
    'msg': 'msg',
    'nuts': 'nuts',
    'peanuts': 'peanuts',
    'soy': 'soy',
    'sesame': 'sesame',
    'sesame oil': 'sesame oil',
    'tree nuts': 'tree nuts',
    'shellfish': 'shellfish',
    'shrimp': 'shrimp',
    'dairy': 'dairy',
    'egg': 'egg'
}

