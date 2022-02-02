FROM python:3.8

WORKDIR /app 
ADD . /app

EXPOSE 5000

ENV PYTHONDONTWRITEBYTECODE 1 

ENV PYTHONUNBUFFERED 1 

ADD requirement.txt . 

RUN python -m pip install -r requirement.txt  



# ModuleNotFoundError: No module named 'flask_pymongo' 에러가뜸 왜지? 