import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setWishlist } from "../Redux/Wishlistslice";

const WishlistLoader = () => {

    const dispatch = useDispatch();

    const { email, isAuthenticated } =
        useSelector(state => state.auth);

    useEffect(() => {

        const fetchWishlist = async () => {

            if (!isAuthenticated) return;

            try {

                const response = await axios.post(
                    "http://localhost:8000/api/wishlist/fetchwishlist",
                    { email }
                );

                dispatch(
                    setWishlist(response.data.wishlist)
                );

            } catch (error) {
                console.log(error);
            }
        };

        fetchWishlist();

    }, [email, isAuthenticated, dispatch]);

    return null;
};

export default WishlistLoader;