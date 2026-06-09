from django.urls import path
from .views import on_Add_to_cart,fetch_cart_data,remove_from_cart,update_quantity


urlpatterns =[
    path('addtocart', on_Add_to_cart),
    path('fetchcartdata', fetch_cart_data),
    path('removefromcart',remove_from_cart),
    path('updatequantity', update_quantity),
   ]
