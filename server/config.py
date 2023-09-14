import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_session import Session, SqlAlchemySessionInterface

from data_sets import ingredient_names

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

from flask_cors import CORS

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)


bcrypt = Bcrypt(app)

load_dotenv()

app.config['SECRET_KEY'] = os.environ.get('FLASK_APP_SECRET_KEY')
# print('app secret key in config.py', app.secret_key)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

# app.config['SESSION_TYPE'] = 'sqlalchemy'  # Use SQLAlchemy as the session interface
# app.config['SESSION_COOKIE_SAMESITE'] = 'None'
# app.config['SESSION_COOKIE_SECURE'] = True
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_PERMANENT'] = False
# app.config['SESSION_COOKIE_NAME'] = 'manage_cookie'

app.config['CORS_HEADERS'] = 'Content-Type'
app.session_interface = SqlAlchemySessionInterface(
    app=app,
    db=db,
    table='your_session_table',  # Replace with your desired session table name
    key_prefix='your_prefix',  # Replace with your desired session key prefix
    use_signer=True,  # Whether to sign the session id cookie or not
    permanent=False  # Whether to use permanent sessions or not
)

# Session(app, session_interface=session_interface)
Session(app)
CORS(app, supports_credentials=True, origin='https://restaurant-companion.vercel.app')

app.json.compact = False

db.init_app(app)
