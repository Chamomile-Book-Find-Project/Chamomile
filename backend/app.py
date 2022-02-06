from flask import Flask, render_template
from pymongo import MongoClient 
from elasticsearch import Elasticsearch 

# Data Base 
client = MongoClient('0.0.0.0:27017')
db = client.Book_data_DB # 데이터 베이스 명 
# collection = db. 컬렉션 명 작성 
#results = collection.find()


es = Elasticsearch()
app = Flask('__name__')

@app.route('/')
def main_page():
    return 'hello world'


if __name__ == '__main__':
    app.run(port = "5001", debug=True)