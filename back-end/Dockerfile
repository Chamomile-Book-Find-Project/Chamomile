# flask 최선버전의 이미지를 베이스로 두겠다. 
FROM flask:latest  

# 현재 폴더를 도커 컨테이너의 back-end에 복사하기 
COPY . /back-end

# pip upgrade 실행 + 필요한 패키지 flask 다운 
RUN pip install --upgrade pip
RUN pip3 install flask 

# 컨테이너 back-end에 넣어줬으니, 해당 디렉토리 work 
WORKDIR /back-end 

COPY . /back-end/


