from pymongo import MongoClient
from django.conf import settings

def ConnectMongo():
    try:
        client = MongoClient(settings.MONGO_URI)
        db= client[settings.DB_NAME]
        collection = db['users']
        
        print("connected to Mongodb")
        return collection
    except Exception as e:
        print('Error in mongodb Connection:',e)

ConnectMongo()