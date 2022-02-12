from sqlite3 import connect
import elasticsearch
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch, helpers 
from elasticsearch.helpers import bulk, parallel_bulk
from tqdm import tqdm 
import pandas as pd 
import json 




app = Flask('__name__')

CORS(app) # Front(nginx)과의 연결 요청 

app.config['UPLOAD_FOLDER'] = './images' # docker container 상 경로 설정 


# MongoDB connect
client = MongoClient('mongodb://root:chamomile123@mongodb:27017/')
db = client.BookDB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find()

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

actions = []
for data_index in tqdm(results, total= db.connection.count()):
    data_index.pop('_id')
    action = {
        "index": {
                    "_index": 'Book',
                    "_type": 'info',
                }
    }
    actions.append(action)
    actions.append(data_index)

request_body = { 
    "settings" : { 
        "number_of_shards": 1,
        "number_of_replicas": 0
    }
}

es.indices.create(index='Book',body = request_body, ignore = 400)
res = es.bulk(index = 'Book', body = actions, refresh = True)


@app.route('/', methods=['POST'])
def main_page():
    # 이미지 업로드 및 저장 
    if request.method == 'POST':
        image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장
        image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename))

        filename = secure_filename(image_data.filename)  # 파일 안정성 검사 
        
    return jsonify({'success': True, 'file':'Received', 'name': filename })   # file : Received : 어떤 내용인지 찾아봐야함 


# 단순 데이터 베이스, 데이터 확인 부분 
@app.route('/mongo/check', methods=['GET'])
def mongoTest():
    global client, db, collection,results
    
    return render_template('test.html',data=results)

# 이미지 업로드 api 부분은 어느정도 된듯 ,  open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 


if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port = 5001, debug=True)
