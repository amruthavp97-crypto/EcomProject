from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dbConfig.db import ConnectMongo
import json
# Create your views here.

@csrf_exempt
def add_to_wishlist(request):
    print(json.loads(request.body))

    table = ConnectMongo()

    if request.method == "POST":

        try:

            body = json.loads(request.body)

            email = body.get("email")
            item = body.get("item")

            user = table.find_one({"email": email})

            if not user:
                return JsonResponse(
                    {"error": "User not found"},
                    status=404
                )

            wishlist = user.get("wishlist", [])
            exists = any(
                isinstance(product, dict) and
                product.get("id") == item.get("id")
                for product in wishlist
        )
            if exists:
                return JsonResponse(
                    {"error": "Already in wishlist"},
                    status=400
                )

            table.update_one(
                {"email": email},
                {
                    "$push": {
                        "wishlist": item
                    }
                }
            )

            return JsonResponse({
                "success": True
            })

        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=500
            )


@csrf_exempt
def remove_wishlist_item(request):

    table = ConnectMongo()

    body = json.loads(request.body)

    email = body.get("email")
    productid = body.get("id")

    table.update_one(
        {"email": email},
        {
            "$pull": {
                "wishlist": {
                    "id": productid
                }
            }
        }
    )

    return JsonResponse({
        "success": True
    })


# to update data in redux
@csrf_exempt
def fetch_wishlist(request):

    table = ConnectMongo()

   
    body = json.loads(request.body)

    email = body.get("email")

    user = table.find_one(
        {"email": email})
      
    

   
    return JsonResponse({
            "status": True,
            "wishlist": user.get("wishlist", [])
        })