FROM python:3.8

EXPOSE 5000

ENV PYTHONDONTWRITEBYTECODE 1 

ENV PYTHONUNBUFFERED 1 

ADD requirement.txt . 
RUN python -m pip install -r requirement.txt 

WORKDIR /app 
ADD . /app 
