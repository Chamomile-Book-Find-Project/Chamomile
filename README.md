# Check this out (이미지 기반 책 정보검색 웹 서비스) 
----------------
Check this out은 이미지 기반 책 정보 검색 웹 서비스로서 사용자가 책 표지의 이미지를 넣었을때 해당 책 표지를 분석하여 책에 대한 카테고리, 제목, 글쓴이, 출판사, 가격을 알려주는 웹 서비스입니다.

### 시연
시연 들어가야댐 


### System Architechure
![Chamomile drawio (4)](https://user-images.githubusercontent.com/76832303/154666423-e402d5f6-4f3a-4ea7-bd74-204571d3a696.png)

### Tech Stack 
~~~~~~~~~~~~~~~~~~~~~~
Frontend : React
Backend : Flask 
WSGI : gunicorn 
WebServer : Nginx
Database : MongoDB, ElasticSearch 
Open API : Clova OCR API 
Etc : Docker, Prometheus, Grafana, Kibana
~~~~~~~~~~~~~~~~~~~~~~


### Initialization

- clone repository

~~~~~~~~~~
$ git clone https://github.com/Chamomile-Book-Search-Project/Chamomile.git
$ cd Chamomile
~~~~~~~~~~~~

- Docker build up 

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
docker-compose up --build
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Team Chamomile
-----------------
2022 Silicon Vally Pre Intership program - Team D 

|          김서진          |         김의빈           |          김주원           |          손정민         |
| ------------------------| ------------------------ | ------------------------ | ------------------------|  
|        Front-end        |        Back-end          |         frontend         |         Back-end        |
|                         |        Crawling          |                          |         Crawling        |
|                         |            DB            |                          |                         |                     |                         |        Server            |                          |                         |  
