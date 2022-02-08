from pymongo import MongoClient

client = MongoClient(host='localhost', port=27000, username='root', password='chamomile123')
db = client.Book_data_DB # 데이터 베이스 명 
collection = db.Book_data
results = collection.find()

for i in results:
    print(i)
# print(client.list_database_names())