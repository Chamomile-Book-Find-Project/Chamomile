from flask import Flask 
from pymongo import MongoClient 


client = MongoClient('mongodb://')
db = client.Book_data_DB 
collections = db.Book_data_DB

app = Flask(__name__)
