import * as React from 'react'
import { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import emptyCart from '../public/img/emptyCart.svg'
import CartItem from './CartItem'
import { OrderItem } from '../Interfaces/intarface'

const CartContainer: React.FC = () => {
  const [tot, setTot] = useState(0)
  const [flag, setFlag] = useState(1)

  const [{ cartShow, cartItems, user }, dispatch] = useStateValue()

  const showCart = () => {
    dispatch({
      type: actionTypes.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator: number, item: OrderItem) {
      return (accumulator += item.qty * parseInt(item.price))
    }, 0)
    setTot(totalPrice)
  }, [tot, flag, cartItems])

  const clearCart = () => {
    dispatch({
      type: actionTypes.SET_CARTITEMS,
      cartItems: []
    })

    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className=" z-[101] fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className=" text-textColor font-semibold text-lg">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-centr gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Item section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
              ))}
          </div>
          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between ">
              <p className="text-lg text-gray-400">Sub total</p>
              <p className="text-lg text-gray-400">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-lg text-gray-400">Delivery</p>
              <p className="text-lg text-gray-400">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ {tot + 2.5}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-6">
          <img src={emptyCart} className="w-300" alt="empty cart" />
          <p className="text-xl text-textColor font-semibold">Add some items to your cart</p>
        </div>
      )}
    </motion.div>
  )
}

export default CartContainer