import elasticsearch
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch, helpers 
import pandas as pd 
import json 


app = Flask('__name__')

CORS(app) # Front(nginx)과의 연결 요청 

app.config['UPLOAD_FOLDER'] = './images' # docker container 상 경로 설정 


# MongoDB connect
client = MongoClient('mongodb://root:chamomile123@mongodb:27017/')
db = client.BookDB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find({})

# import csv in Database (MongoDB & ElasticSearch)
# mongo DB 
data = pd.read_csv('DB_txt.csv')
data.reset_index(inplace=True)
data_dict = data.to_dict ("records")
collection.insert_many(data_dict)

# # elastic search connect
es = Elasticsearch(
    hosts=['http://elasticsearch:9200'],
    http_auth=('elastic','chamomile123')
)

if not es.ping():
    print('connection failed')
else: 
    print('connection successful')

# elastic search & mongodb 
class My_MongoDB() :
    def __init__(self) :
        self.client = MongoClient("mongodb://root:chamomile123@mongodb:27017/")

    def Get_Data(self, db, collection) :
        return self.client[db][collection].find({})
            
    def __del__(self) :
        self.client.close()

class My_Elasticsearch() :
    def __init__(self) :
        self.es = Elasticsearch(
        hosts=['http://elasticsearch:9200'],
        http_auth=('elastic','chamomile123')
        )
        
    def Search(self, _index, _body) :
        return self.es.search(index=_index, body={_body})
    
    def Insert(self, _index, _data) :
        with open('mapping.json', 'r') as f: 
            mapping = json.load(f)

        self.es.indices.create(index = _index, body = mapping)
        helpers.bulk(self.es, _data, index = _index)


def es_import() :
    mongodb = My_MongoDB()
    mongo_data = pd.DataFrame(mongodb.Get_Data("BookDB", "Book_data"))
    del(mongo_data['_id'])
    data = mongo_data.to_dict('records')
    es = My_Elasticsearch()
    es.Insert("book_idx",data)

@app.route('/', methods=['GET'])
def main():
    return 'Backend-server Connect'

@app.route('/data/inout', methods=['POST'])
def data():
    return 'Data Server'

# 단순 데이터 베이스, 데이터 확인 부분 
@app.route('/db/mongo', methods=['GET'])
def mongo():
    global client, db, collection,results
    
    return render_template('test.html',data=results)

# 이미지 업로드 api 부분은 어느정도 된듯 ,  open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 

@app.route('/db/elastic')
def elastic():
    global My_MongoDB, My_Elasticsearch, es_import
    es_import()
    return 'Data Import!'


if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port = 5001, debug=True)
