from flask import Flask, redirect, url_for, request, render_template
from pymongo import MongoClient
import os 
# flask 예시 -> 띄울때는 flask run으로 실행하면됨  *주의* 실행할 때, 해당 파일내까지 접근하고 해야한다.

# render_template를 활용하여 html 연결해보고자 시도함 근데안됨 (수정하셔도 됩니다.)

app = Flask(__name__)

client = MongoClient(os.environ['DB_PORT_27017_TCP_ADDR'], 27017)
db = client.mongodb 


@app.route('/')
def main():
    _items = [item for item in _items]
    return render_template('템플릿 이름', items=items)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

