from flask import Flask 
from flask_pymongo import Pymongo 

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = Pymongo(app)

