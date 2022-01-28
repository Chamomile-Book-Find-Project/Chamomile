from flask import Flask, render_template 

app = Flask(__name__)

@app.route('/')
def book_page():
    return render_template("Frontend.html")
     

# flask 예시 -> 띄울때는 flask run으로 실행하면됨  *주의* 실행할 때, 해당 파일내까지 접근하고 해야한다.

# render_template를 활용하여 html 연결해보고자 시도함 근데안됨 (수정하셔도 됩니다.)