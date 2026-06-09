from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dbConfig.db import ConnectMongo
import json
# Create your views here.

@csrf_exempt
def on_Add_to_cart(request):

    table = ConnectMongo()

    if request.method == "POST":

        try:

            data = json.loads(request.body)

            item = data.get("item")
            email = data.get("email")

            if not email:
                return JsonResponse(
                    {'error': 'no email in backend'},
                    status=400
                )

            user = table.find_one({"email": email})

            if not user:
                return JsonResponse(
                    {'error': 'There is no user in database'},
                    status=400
                )

            cart = user.get("cart", [])

            alreadyExist = any(
                cartitem.get("id") == item.get("id")
                for cartitem in cart
            )

            print("Already exists:", alreadyExist)

            if alreadyExist:
                return JsonResponse(
                    {'error': 'item already added to cart'},
                    status=409
                )

            # Add quantity field before saving
            item["quantity"] = 1

            table.update_one(
                {"email": email},
                {
                    "$push": {
                        "cart": item
                    }
                }
            )

            return JsonResponse(
                {"message": "item added to cart"},
                status=200
            )

        except Exception as e:

            print("ERROR:", str(e))

            return JsonResponse(
                {"error": str(e)},
                status=500
            )
@csrf_exempt
def fetch_cart_data(request):
    table=ConnectMongo()
    if request.method=="POST":
        try:
            body=json.loads(request.body)
            email=body.get('email')
            #find user
            userCart=table.find_one(
                {'email': email},
                {
                    "_id": 0,
                    "cart": 1
                }
            )
            if userCart:
                return JsonResponse(
                    {
                        'message':"cart.data.founded",
                        'cart':userCart.get('cart',[])
                    }
                )
        except Exception as e:
            import traceback

            print("FETCH CART ERROR:")
            traceback.print_exc()

            return JsonResponse(
                {"message": str(e)},
                status=500
            )
@csrf_exempt
def remove_from_cart(request):

    table = ConnectMongo()

    if request.method == "POST":

        try:

            body = json.loads(request.body)

            email = body.get("email")
            productid = body.get("id")

            result = table.update_one(
                {"email": email},
                {
                    "$pull": {
                        "cart": {
                            "id": productid
                        }
                    }
                }
            )

            if result.modified_count > 0:

                return JsonResponse({
                    "message": "Item removed successfully"
                })

            else:

                return JsonResponse({
                    "message": "Item not found"
                })

        except Exception as e:

            return JsonResponse({
                "error": str(e)
            })
        
@csrf_exempt
def update_quantity(request):

    table = ConnectMongo()

    if request.method == "POST":

        try:

            body = json.loads(request.body)

            email = body.get("email")
            productid = body.get("id")
            action = body.get("action")

            user = table.find_one({"email": email})

            if not user:
                return JsonResponse(
                    {"error": "User not found"},
                    status=404
                )

            cart = user.get("cart", [])

            for item in cart:

                if item.get("id") == productid:

                    if "quantity" not in item:
                        item["quantity"] = 1

                    if action == "increment":
                        item["quantity"] += 1

                    elif action == "decrement":

                        if item["quantity"] > 1:
                            item["quantity"] -= 1

                    break

            table.update_one(
                {"email": email},
                {
                    "$set": {
                        "cart": cart
                    }
                }
            )

            return JsonResponse(
                {"message": "Quantity updated successfully"},
                status=200
            )

        except Exception as e:

            return JsonResponse(
                {"error": str(e)},
                status=500
            )