from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from dbConfig.db import ConnectMongo 
from .models import UserModel
from django.contrib.auth.hashers import make_password,check_password
from .Services.email_service import EmailService
from django.conf import settings
import jwt


@csrf_exempt
def Account_creation(request):
    table = ConnectMongo()
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # validations 
            if not name or not email or not password:
                return JsonResponse(
                    {'error':"All fields are required"},
                    status = 400
                )
            # Check user Exist or not 
            if table.find_one({"email":email}):
                return JsonResponse(
                    {"error":"User already Exists"},
                    status = 400
                )
            # Convert password in to hash password 
            hashed_password = make_password(password)

            # Create a model 
            newUser = UserModel(name,email,hashed_password)

            # send mail in to user email address 
            verificationUrl = f"http://localhost:5173/verify-email/{newUser.verificationToken}"

            email_send =  EmailService.send_verification_email(
                user_email=email,
                user_name= name,
                verification_url=verificationUrl
            )

            if not email_send:
                return JsonResponse(
                    {"error":"Failed to send verification mail"}
                )
            
            # save user in to mongodb 
            table.insert_one(newUser.to_dict())
            
            return JsonResponse(
                {'message':'User registed in mongodb',
                 "email":"Email send to mail",
                "registed user": newUser.name},
                status = 200
            )
            
        except Exception as e:
            return JsonResponse(
                {'error':f'Error in Signup server -- {str(e)}'},
                status = 500
            )

    


@csrf_exempt
def Account_Login(request):
    table = ConnectMongo()
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            
            # validations 
            if not email or not password:
                return JsonResponse(
                    {'error':"All fields are required"},
                    status = 400
                )

            # Check user Exist or not 
            user = table.find_one({'email':email})
            if not user:
                return JsonResponse(
                    {"error":"User does not exist, create a new account"},
                    status = 400
                )
            # Is user verified or not 
            if not user['isVerified']:
                return JsonResponse(
                    {'error':'User is not Verified, please Verify your Email address'},
                    status = 400
                )

            # Verify actual user password with loggedin user password
            if not check_password(password , user['password']):
                return JsonResponse(
                    {'error':"Invalid password"},
                    status = 400
                )
            # Generate jwt token
            payload = {
                'email': user['email'],
                'name': user['name'],
            }
            secret = getattr(settings,'SECRET_KEY')
            token= jwt.encode(payload,secret,algorithm='HS256')                           


            # if user existing and password is matching then user become logged in 
            response = JsonResponse(
                {"message":"User logged in Successfully",
                  "logged_User": user['name']},
                status = 200
            )

            response.set_cookie(
                key='authtoken',
                value=token,
                max_age=7*24*60*60,
                path='/',
                samesite='Lax'
            ) 
            return response


        except Exception as e:
            return JsonResponse(
                {'error':f'Error in Login server -- {str(e)}'},
                status = 500
            )
        

@csrf_exempt
def Account_Verify(request):    
    table = ConnectMongo()
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')
            # print("Token in backend ==", token)
            if not token:
                return JsonResponse(
                    {"error":"Token is Required"},
                    status = 400
                )
            user = table.find_one({'verificationToken':token})
            # make user as verified true and delete verification token 
            table.update_one(
                user,
                {
                    '$set': {'isVerified': True},
                    '$unset': {'verificationToken': ""}
                }
            )

            # send a welcome mail 
            welcome_mail = EmailService.send_welcome_email(
                user_email= user['email'],
                user_name= user['name']
            )

            if not welcome_mail:
                return JsonResponse(
                    {"error":"Failed to send welcome mail"},
                    status = 500
                )

            return JsonResponse(
                {"message":"Account verification Completed"},
                status = 200
            )
        except Exception as e:
            return JsonResponse(
                {'error':f"Error in Account Verify : {str(e)} "},
                status = 500
            )
        
    return JsonResponse(
        {'error':"Method In invalid"},
        status = 500
    )
@csrf_exempt
def Account_Logout(request):
    if request.method == 'POST':
        try:
            response = JsonResponse(
                {'message':"Logged out successfully"},
                status=200
            )
            response.delete_cookie('authtoken')
            print("Token deleted")
            return response
    
        except Exception as e:
            return JsonResponse(
                {'error':"Logout failed"},status =500

            )
