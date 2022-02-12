FROM python:3.8

EXPOSE 5001


ENV PYTHONDONTWRITEBYTECODE 1 
ENV PYTHONUNBUFFERED 1 
ENV DEBUG true 

COPY DB_txt.csv ./DB_txt.csv  

ADD requirement.txt . 

RUN pip install --upgrade pip 
RUN pip install -r requirement.txt  

WORKDIR /app
ADD . /app