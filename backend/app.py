from flask import Flask 
from pymongo import MongoClient 


client = MongoClient('DATABASE LINK')
db = client.Book_data_DB 

app = Flask(__name__)
