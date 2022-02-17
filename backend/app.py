from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch, helpers
from set import mongo_input, elastic_check, search, search_result
import pandas as pd 
import json

app = Flask('__name__', static_url_path = '/images')
CORS(app, resources={r"/*" : {"origins" : "*"}}) # Front(nginx)과의 연결 요청 
app.config['UPLOAD_FOLDER'] = './images/' # docker container 상 경로 설정 

client = MongoClient('mongodb://root:chamomile123@mongodb:27017/')
db = client.BookDB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find({})

def image_import():
    image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장        
    filename = secure_filename(image_data.filename)  # 파일 안정성 검사  
    return image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename)) #검사 이후, 폴더에 저장 

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

elastic_check()
mongo_input()
es_import()


@app.route('/', methods=['GET'])
def main():
    return 'Backend-server Connect'


@app.route('/data/upload', methods=['POST'])
def data():
    image_import()
    search(app.config['UPLOAD_FOLDER'])
    
@app.route('/data/result', methods = ['POST'])
def result():
    return jsonify( search_result() )

@app.route('/data/check', methods =['GET','POST'])
def test():
    result = search_result()

    return result

# 단순 데이터 베이스, 데이터 확인 부분 
@app.route('/data/mongo', methods=['GET'])
def mongo():
    global client, db, collection,results
    
    return render_template('test.html',data=results)



if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port = 5001, debug=True)


# docker-compose up --build -d