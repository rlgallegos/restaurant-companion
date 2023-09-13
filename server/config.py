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

load_dotenv()
print(os.environ)
print('the secret key', os.environ.get('FLASK_APP_SECRET_KEY'))
app.secret_key = os.environ.get('FLASK_APP_SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, supports_credentials=True, origin='*')

app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)