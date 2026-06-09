from django.db import models
from datetime import datetime,timedelta
import uuid

class UserModel:
    def __init__(self,name,email,password):
        self.name= name 
        self.email= email 
        self.password= password
        self.isVerified=False
        self.verificationToken= str(uuid.uuid4())
        self.tokenExpiry= (datetime.now()+ timedelta(hours=1)).isoformat()
        self.created_at= datetime.now().isoformat()
    def to_dict(self):
        return{
            "name":self.name,
            "email":self.email,
            "password":self.password,
            "isVerified":self.isVerified,
            "verificationToken":self.verificationToken,
            "createdAt":self.created_at
        }

# Create your models here.
