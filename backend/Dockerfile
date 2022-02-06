FROM python:3.8

EXPOSE 5001

ENV PYTHONDONTWRITEBYTECODE 1 

ENV PYTHONUNBUFFERED 1 

ADD requirement.txt . 

RUN pip install --upgrade pip 
RUN pip install -r requirement.txt  
RUN pip install pillow 

WORKDIR /app 
ADD . /app

