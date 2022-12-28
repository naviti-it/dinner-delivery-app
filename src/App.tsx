import * as React from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header, MainContainer, CreateContainer } from './components'
import { AnimatePresence } from 'framer-motion'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { useStateValue } from './Context/StateProvider'
import { actionTypes } from './Context/reducer'
import { FoodItem } from './Interfaces/intarface'

const App = () => {
  const [, dispatch] = useStateValue()

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionTypes.SET_FOOD_ITEMS,
        foodItems: data as FoodItem[]
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary ">
        <Header />
        <main className=" mt-14 px-4 md:mt-20 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App
