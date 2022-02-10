from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient  
from flask_cors import CORS
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 
from elasticsearch import Elasticsearch
from elasticsearch import helpers 



app = Flask('__name__', template_folder='templates')
app.config['UPLOAD_FOLDER'] = './images' # docker container 상 경로 설정 

CORS(app, resources={r'*':{'origins':'http://localhost:80'}}) # Front(nginx)과의 연결 요청 

# elastic search 
es = Elasticsearch('http://localhost:9200')

# DataBase connect
client = MongoClient('mongodb://root:chamomile123@mongodb:27017/')
db = client.Book_data_DB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find()

# mongo DB 연결 
@app.route('/', methods=['POST'])
def main_page():
    # 이미지 업로드 및 저장 
    if request.method == 'POST':
        image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장
        image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename))

        filename = secure_filename(image_data.filename)  # 파일 안정성 검사 
        

    # open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 

    return jsonify({'success': True, 'file':'Received', 'name': filename })   # file : Received : 어떤 내용인지 찾아봐야함 


# 데이터 확인 구간 
@app.route('/data', methods=['GET'])
def mongoTest():
    global client, db, collection, results
    client.close()
    return render_template('test.html',data=results)

# 이미지 업로드 api 부분은 어느정도 된듯 ,  open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 
    
if __name__ == '__main__':
    app.run(host='localhost',port = 5001, debug=True)

