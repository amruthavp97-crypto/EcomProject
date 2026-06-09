import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  setCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from '../Redux/cartSlice'

const Mycart = () => {

  const dispatch = useDispatch()

  const { email } = useSelector(state => state.auth)

  const cartData = useSelector(
    state => state.cart.items
  )

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCartData = async () => {

      try {

        const response = await axios.post(
          'http://localhost:8000/api/cart/fetchcartdata',
          { email }
        )

        const cart = response.data?.cart?.map(item => ({
          ...item,
          quantity: item.quantity || 1
        })) || []

        dispatch(setCart(cart))

      } catch (error) {

        console.log("error in cart data fetching")
        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchCartData()

  }, [email, dispatch])

  const increment = async (id) => {

    dispatch(incrementQuantity(id))

    try {

      await axios.post(
        "http://localhost:8000/api/cart/updatequantity",
        {
          email,
          id,
          action: "increment"
        }
      )

    } catch (error) {

      console.log(error)

      // rollback
      dispatch(decrementQuantity(id))
    }
  }

  const decrement = async (id) => {

    dispatch(decrementQuantity(id))

    try {

      await axios.post(
        "http://localhost:8000/api/cart/updatequantity",
        {
          email,
          id,
          action: "decrement"
        }
      )

    } catch (error) {

      console.log(error)

      // rollback
      dispatch(incrementQuantity(id))
    }
  }

  const onRemoveFromCart = async (id) => {

    dispatch(removeFromCart(id))

    try {

      await axios.post(
        'http://localhost:8000/api/cart/removefromcart',
        {
          email,
          id
        }
      )

    } catch (error) {

      console.log(error)
    }
  }

  const totalOfferPrice = cartData.reduce(
    (total, value) =>
      total + (value.oldPrice * (value.quantity || 1)),
    0
  )

  const totalPrice = cartData.reduce(
    (total, value) =>
      total + (value.price * (value.quantity || 1)),
    0
  )

  if (loading) {
    return (
      <div className='text-3xl text-center'>
        Loading.......
      </div>
    )
  }

  return (
    <div className='p-20'>

      {cartData.length === 0 ? (

        <div className='text-center text-4xl'>
          Empty Cart
        </div>

      ) : (

        <table className='w-full border border-collapse'>

          <thead>
            <tr className='border-b p-4'>
              <th className='p-4'>Image</th>
              <th className='p-4'>Product</th>
              <th className='p-4'>Price</th>
              <th className='p-4'>Offer Price</th>
              <th className='p-4'>Quantity</th>
              <th className='p-4'>Action</th>
            </tr>
          </thead>

          <tbody>

            {cartData
              ?.filter(item => item && item.image)
              ?.map(item => (

                <tr
                  className='border'
                  key={item.id}
                >

                  <td className='p-4 flex justify-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-24 object-cover'
                    />
                  </td>

                  <td className='p-4 text-center'>
                    {item.name}
                  </td>

                  <td className='p-4 text-center line-through text-black/50'>
                    ₹{item.oldPrice * item.quantity}
                  </td>

                  <td className='p-4 text-center'>
                    ₹{item.price * item.quantity}
                  </td>

                  <td className='p-4 text-center'>

                    <div className='flex items-center justify-center gap-4'>

                      <button
                        onClick={() => decrement(item.id)}
                        className='w-8 h-8 flex items-center justify-center bg-orange-400 rounded-md text-lg font-bold'
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increment(item.id)}
                        className='w-8 h-8 flex items-center justify-center bg-orange-400 rounded-md text-lg font-bold'
                      >
                        +
                      </button>

                    </div>

                  </td>

                  <td className='text-center'>

                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className='bg-orange-400 px-6 py-2 text-white'
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            <tr className='border-t font-bold bg-gray-100'>

              <td
                colSpan='2'
                className='text-right p-4'
              >
                Grand Total
              </td>

              <td className='text-center p-4'>
                ₹{totalOfferPrice}
              </td>

              <td className='text-center p-4'>
                ₹{totalPrice}
              </td>

              <td></td>

              <td className='text-center'>
                <button className='text-white px-8 py-2 bg-orange-400'>
                  Buy Now
                </button>
              </td>

            </tr>

          </tbody>

        </table>

      )}

    </div>
  )
}

export default Mycart