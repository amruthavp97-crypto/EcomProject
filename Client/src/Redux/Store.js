import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Authslice'
import wishlistReducer from "./Wishlistslice"
import cartReducer from "./Cartslice"
const store = configureStore({
    reducer :{
        auth :authReducer,
        wishlist: wishlistReducer,
        cart: cartReducer
    }
})
export default store