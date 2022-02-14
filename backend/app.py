import elasticsearch
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch, helpers 

import requests 
import uuid 
import time 
import pandas as pd 
import json 
import base64

app = Flask('__name__')

CORS(app) # Front(nginx)과의 연결 요청 

app.config['UPLOAD_FOLDER'] = './images' # docker container 상 경로 설정 


# MongoDB connect
client = MongoClient('mongodb://root:chamomile123@mongodb:27017/')
db = client.BookDB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find({})

# import csv in Database (MongoDB & ElasticSearch)

# mongo DB  Data import 
data = pd.read_csv('DB_txt.csv')
data.reset_index(inplace=False)
data_dict = data.to_dict ("records")
collection.insert_many(data_dict)

# # elastic search connect
es = Elasticsearch(
    hosts=['http://elasticsearch:9200'],
    http_auth=('elastic','chamomile123')
)

# check elasitc connect 
if not es.ping():
    print('connection failed')
else: 
    print('connection successful')

# elastic search & mongodb connect

# Get mongoDB data
class My_MongoDB() :
    def __init__(self) :
        self.client = MongoClient("mongodb://root:chamomile123@mongodb:27017/")

    def Get_Data(self, db, collection) :
        return self.client[db][collection].find({})
            
    def __del__(self) :
        self.client.close()

# Create Elasticsearch index & import  
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


@app.route('/data/upload', methods=['POST'])
def data():
    if request.method == 'POST' : 
        image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장        
        filename = secure_filename(image_data.filename)  # 파일 안정성 검사 
        image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename)) #검사 이후, 폴더에 저장 
        
        folder_list = os.listdir('./images')
        
    return "file_list : {}".format(folder_list) 


@app.route('/data/upload/search')
def search():
    # 이부분에 api 내용 옮겨담기 
    api_url = 'https://0k7t1bylkc.apigw.ntruss.com/' \
              'custom/v1/14174/5de3c9ce2fd1434efa8cf011811303cf21bbe4941c8e28cd1ff433873ed56d6c/general'
    secret_key = 'ZGdXQWlqVld1ZFdkWXJCYlJFYnloc0NaRGRkaU5UTHQ='
    image_file = './images'
    with open(image_file,'rb') as f:
      file_data = f.read()

    # api에 요청할 정보
    request_json = {
        'images': [
            {
                'format': ['jpg','png'],
                'name': 'demo',
                'data': base64.b64encode(file_data).decode()
            }
        ],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(round(time.time() * 1000))
    }

    payload = json.dumps(request_json).encode('UTF-8')
    headers = {
        'X-OCR-SECRET': secret_key,
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", api_url, headers=headers, data=payload) #ocr응답
    
    # json에서 title 파싱 및 리스트화
    jsonobject = json.loads(response.text)
    title_list = []
    for i in range(len(jsonobject['images'][0]['fields'])):
        jsonarray = jsonobject['images'][0]['fields'][i]['inferText']
        title_list.append(jsonarray)
    return title_list


# 단순 데이터 베이스, 데이터 확인 부분 
@app.route('/data/mongo', methods=['GET'])
def mongo():
    global client, db, collection,results
    
    return render_template('test.html',data=results)


@app.route('/data/elastic')
def elastic():
    global My_MongoDB, My_Elasticsearch, es_import
    es_import()
    return 'Data Import!'


if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port = 5001, debug=True)
