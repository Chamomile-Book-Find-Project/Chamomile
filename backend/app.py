from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient  
import os 
from werkzeug.utils import secure_filename # 파일 안정성 검사 



# Data Base 
client = MongoClient('localhost:27017')
db = client.Book_data_DB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find()
# es = Elasticsearch()


app = Flask('__name__')
app.config['UPLOAD_FOLDER'] = './images' # docker container 상 경로 설정 

@app.route('/', methods=['POST'])
def main_page():
    # 이미지 업로드 및 저장 
    if request.method == 'POST':
        image_data = request.files['file']  # 이미지 파일을 불러와서 images폴더에 저장
        image_data.save(os.path.join(app.config['UPLOAD_FOLDER'], image_data.filename))

        filename = secure_filename(image_data.filename)  # 파일 안정성 검사 

    # open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 

    return jsonify({'success': True, 'file':'Received', 'name': filename })   # file : Received : 어떤 내용인지 찾아봐야함 


# 이미지 업로드 api 부분은 어느정도 된듯 ,  open api + elastic search + mongodb 이렇게 세가지 연결해줘야함 
    
if __name__ == '__main__':
    app.run(port = "5001", debug=True)

