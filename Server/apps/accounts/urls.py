from django.urls import path
from .views import Account_creation,Account_Login,Account_Verify,Account_Logout

urlpatterns =[
    path('signup',Account_creation),
    path('login',Account_Login),
    path('verify-email',Account_Verify),
    path('logout',Account_Logout)

]


