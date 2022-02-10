import pandas as pd
from pymongo import MongoClient
import json

def mongoimport(csv_path, db_name, coll_name, db_url='localhost', db_port=27000):
    client = MongoClient(db_url, db_port)
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.remove()
    coll.insert(payload)
    return coll.count()


mongoimport('DB_txt.csv','Book_data_DB','Book_data','mongodb://root:chamomile123@mongodb:27017/')