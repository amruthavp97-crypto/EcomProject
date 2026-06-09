import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {

        setCart: (state, action) => {
            state.items = action.payload || [];
        },

        incrementQuantity: (state, action) => {

            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item) {
                item.quantity = (item.quantity || 1) + 1;
            }
        },

        decrementQuantity: (state, action) => {

            const item = state.items.find(
                item => item.id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeFromCart: (state, action) => {

            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        }
    }
});

export const {
    setCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;