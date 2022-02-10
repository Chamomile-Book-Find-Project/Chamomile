FROM python:latest



RUN pip install --upgrade pip 

ADD requirement.txt . 

RUN pip install -r requirement.txt

CMD python3 input.py run 