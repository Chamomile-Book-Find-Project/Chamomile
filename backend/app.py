from gettext import find
import elasticsearch
from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch, helpers 

import requests 
import uuid 
import time 
import pandas as pd 
import json 
import base64

app = Flask('__name__', static_url_path = '/images')

CORS(app, resources={r"/*" : {"origins" : "*"}}) # Front(nginx)과의 연결 요청 

app.config['UPLOAD_FOLDER'] = './images/' # docker container 상 경로 설정 


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

def image_import():
    image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장        
    filename = secure_filename(image_data.filename)  # 파일 안정성 검사  
    return image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename)) #검사 이후, 폴더에 저장 


# Image Upload
def search(image_data):
    for img in os.listdir(image_data):
        image = os.path.join(image_data,img)
    # 이부분에 api 내용 옮겨담기 
    api_url = 'https://82ohilq1o4.apigw.ntruss.com/custom/v1/14260/aaf2320646108059a87ab5017a86aee454f5378ed95003dbb2e12f4ca5266e0e/general'
    secret_key = 'WG1lRHlkRWFDT0pic3RCTFBmSkJqTGtIb3pBWXlzVko='
    image_file = image
    with open(image_file, 'rb') as f:
      file_data = f.read()

    # api에 요청할 정보
    request_json = {
        'images': [
            {
                'format': 'jpg',
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
        if len(title_list) >= 5 : 
            break 
    result_text = (" ".join(title_list))
    with open('search_text/r_text.txt','w',encoding='utf-8') as f:
        f.write(result_text)
    os.remove(image_file)  

# Text Data Search 
def search_result():
    with open('./search_text/r_text.txt','r', encoding='utf-8') as file:
        r_text = file.read()
    docs = es.search(
            index = 'book_idx' , 
            body = {
                "query" : {
                    "match" : {
                        "Title" : r_text,
                        # "fields" : ["Title", "Writer"]

                    }
                }
            }
        )
    
    result_dic = {}
    e_result = []
    for data in docs['hits']['hits']: 
        e_result.append(
            {
                "Category" : data["_source"]["Category"],
                "Title" : data["_source"]["Title"],
                "Writer" : data["_source"]["Writer"],
                "Bookmade" : data["_source"]["Book_made"],
                "Sellprice" : data["_source"]["Sell_price"],
                "ImageUri" : data["_source"]["Image_uri"]
            }
        )

    result_dic = {
        "result" : e_result
    }
    
    return result_dic



@app.route('/', methods=['GET'])
def main():
    return 'Backend-server Connect'


@app.route('/data/return', methods=['GET','POST'])
def data():
    image_import()
    search(app.config['UPLOAD_FOLDER'])
    result = search_result()

    return jsonify(result)

@app.route('/data/check', methods =['GET','POST'])
def test():
    result = search_result()

    return jsonify({"search" : result})

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


# docker-compose up --build -d