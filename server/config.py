from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

from data_sets import ingredient_names

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# from flask_cors import CORS

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)
app = Flask(__name__)
bcrypt = Bcrypt(app)
# CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rlgallegos85:MzXYvPcBwXVyQy43aTFxA02hmyHEkWyB@dpg-cgngl8bldisfgrv47mpg-a.ohio-postgres.render.com/dbcapstone_yi94'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)