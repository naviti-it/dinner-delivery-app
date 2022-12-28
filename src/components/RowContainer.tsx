import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import notFound from '../public/img/NotFound.svg'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import { FoodItem } from '../Interfaces/intarface'

interface RowContainerProps {
  flag: boolean
  data: Array<FoodItem>
  scrollValue?: number
}

const RowContainer: React.FC<RowContainerProps> = ({ flag, data, scrollValue }) => {
  const [items, setItems] = useState([])

  const [{ cartItems }, dispatch] = useStateValue()

  const rowContainer = useRef<HTMLDivElement>()
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])

  const addToCart = () => {
    dispatch({
      type: actionTypes.SET_CARTITEMS,
      cartItems: items
    })
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  useEffect(() => {
    addToCart()
  }, [items])

  return (
    <div
      ref={rowContainer}
      className={`w-full my-3 xl:my-12 pt-10 flex scroll-smooth items-center ${
        flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4   my-4 xl:my-12 mx-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item?.imageURL}
                alt=""
                className="w-40 h-40 object-contain -mt-8 drop-shadow-2xl"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:shadow-md cursor-pointer -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className=" text-white" />
              </motion.div>
            </div>
            <div className="w-full pb-5 flex items-end justify-end flex-col -mt-4">
              <p className=" text-textColor font-semibold text-base md:text-lg z-10">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories} Calories</p>
              <div className="flex items-center">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center flex-col">
          <img src={notFound} className="w-full h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">Items Not Available</p>
        </div>
      )}
    </div>
  )
}

export default RowContainer
