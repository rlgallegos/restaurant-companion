import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

from data_sets import ingredient_names

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

from flask_cors import CORS

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)


bcrypt = Bcrypt(app)
CORS(app)

load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)