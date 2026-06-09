import React from 'react'
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { addToWishlist,removeFromWishlist,setWishlist } from '../Redux/Wishlistslice';

const Product = ({ item, image, heading, desc, actualprice, offerprice }) => {

    const { isAuthenticated, email } = useSelector(state => state.auth);

    const wishlist = useSelector(
        state => state.wishlist.items
    );

    const isWishlisted = wishlist.some(
        product => product.id === item.id
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onBuynow = () => {

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

    };

    const onAddToCart = async () => {

        console.log("Add to cart called", item);
        console.log("email:", email);

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {

            await axios.post(
                "http://localhost:8000/api/cart/addtocart",
                { item, email }
            );

            toast.success("Item added to CART");

        } catch (error) {

            const errorResponse = error.response?.data?.error;

            console.log("Error in addtocart:", error);

            toast.error(errorResponse || "Something went wrong");
        }
    };
const onAddToWishlist = async () => {

    if (!isAuthenticated) {
        navigate('/login');
        return;
    }

    try {

        if (isWishlisted) {

            await axios.post(
                "http://localhost:8000/api/wishlist/removewishlist",
                {
                    email,
                    id: item.id
                }
            );

            dispatch(removeFromWishlist(item.id));

            toast.success("Removed from Wishlist");

        } else {

            await axios.post(
                "http://localhost:8000/api/wishlist/addtowishlist",
                {
                    item,
                    email
                }
            );

            dispatch(addToWishlist(item));

            toast.success("Added to Wishlist");
        }

    } catch (error) {

        console.log(error);

        const errorResponse =
            error.response?.data?.error ||
            error.response?.data?.message;

        toast.error(errorResponse || "Something went wrong");
    }
};
   

    return (
        <div className="p-6">

            <div className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

                <div className="relative">

                    <div
                        onClick={onAddToWishlist}
                        className="absolute top-3 right-3 text-2xl cursor-pointer z-10"
                    >
                        {
                            isWishlisted
                                ? <FaHeart className="text-red-500" />
                                : <FaRegHeart />
                        }
                    </div>

                    <img
                        src={image}
                        alt="Product"
                        className="w-full h-56 object-cover"
                    />

                </div>

                <div className="p-5">

                    <h2 className="text-2xl font-bold text-gray-800">
                        {heading}
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        {desc}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                        <span className="text-2xl font-bold text-green-600">
                            ₹{actualprice}
                        </span>

                        <span className="text-sm line-through text-gray-400">
                            ₹{offerprice}
                        </span>

                    </div>

                    <div className="flex items-center justify-between gap-6 mt-5">

                        <button
                            onClick={onBuynow}
                            className="flex-2 bg-orange-400 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition duration-300"
                        >
                            Buynow
                        </button>

                        <button
                            onClick={onAddToCart}
                            className="flex-1 py-3 flex items-center justify-center hover:scale-110 transition duration-300"
                        >
                            <FaCartPlus className="text-4xl" />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Product;