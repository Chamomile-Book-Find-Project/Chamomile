from flask import Flask 

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'hello'
     

# flask 예시 -> 띄울때는 flask run으로 실행하면됨  *주의* 실행할 때, 해당 파일내까지 접근하고 해야한다.