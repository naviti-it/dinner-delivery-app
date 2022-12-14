import * as React from 'react'
import { useState, useEffect } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import { OrderItem } from '../Interfaces/intarface'

let items: Array<OrderItem> = []

interface CartItemProps {
  item: OrderItem
  flag: number
  setFlag: (flag: number) => void
}

const CartItem: React.FC<CartItemProps> = ({ item, flag, setFlag }) => {
  const [{ cartItems }, dispatch] = useStateValue()
  const [qty, setQty] = useState(item.qty)

  useEffect(() => {
    items = cartItems
  }, [qty, cartItems])

  const cartDispatch = () => {
    localStorage.setItem('cartItems', JSON.stringify(items))
    dispatch({
      type: actionTypes.SET_CARTITEMS,
      cartItems: items
    })
  }

  const updateQty = (action: string, id: string) => {
    if (action === 'add') {
      setQty((prev: number) => prev + 1)
      cartItems.forEach((item: OrderItem) => {
        if (item.id === id) {
          item.qty += 1
          setFlag(flag + 1)
        }
      })
      cartDispatch()
    } else {
      if (qty === 1) {
        items = cartItems.filter((item: OrderItem) => item.id !== id)
        setFlag(flag + 1)
        cartDispatch()
      } else {
        setQty((prev: number) => prev - 1)
        cartItems.forEach((item: OrderItem) => {
          if (item.id === id) {
            item.qty -= 1
            setFlag(flag + 1)
          }
        })
      }
    }
  }

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        alt="item"
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty('remove', item.id)}>
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty('add', item.id)}>
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  )
}

export default CartItem
