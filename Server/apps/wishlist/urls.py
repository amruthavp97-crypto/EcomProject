from django.urls import path
from .views import add_to_wishlist,fetch_wishlist,remove_wishlist_item

urlpatterns=[
    path('addtowishlist', add_to_wishlist),
    path('fetchwishlist', fetch_wishlist),
    path('removewishlist',remove_wishlist_item),
]