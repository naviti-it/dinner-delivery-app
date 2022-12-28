import * as React from 'react'
import { useState } from 'react'
import logo from '../public/img/logo.png'
import avatar from '../public/img/avatar.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { app } from '../firebase.config'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'

const Header: React.FC = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue()

  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData }
      } = await signInWithPopup(firebaseAuth, provider)

      dispatch({
        type: actionTypes.SET_USER,
        user: providerData[0]
      })

      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(false)
    localStorage.clear()

    dispatch({
      type: actionTypes.SET_USER,
      user: null
    })
  }

  const showCart = () => {
    dispatch({
      type: actionTypes.SET_CART_SHOW,
      cartShow: !cartShow
    })
  }

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desctop  & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-xl font-bold ml-3">City</p>
        </Link>

        <div className="flex items-center w-1/2 justify-arround">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center w-full justify-evenly"
          >
            <li
              className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>

          <div className=" relative flex items-center justify-center mr-3" onClick={showCart}>
            <MdShoppingBasket className="text-textColor text-xl" />
            {cartItems && cartItems.length > 0 && (
              <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold  ">{cartItems.length}</p>
              </div>
            )}
          </div>
          <div className=" relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt="userprofile"
              className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 bg-gray-50  shadow-xl rounded-lg absolute top-12 right-0 flaex flex-col"
              >
                {user && user.email === 'naviti.it@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full  ">
        <div className=" relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-xl" onClick={showCart} />
          {cartItems && cartItems.length > 0 && (
            <div className="w-5 h-5 absolute -top-2 -right-2 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold  ">2</p>
            </div>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2 ">
          <img src={logo} className="w-8 object-cover" alt="logo" />
          <p className=" text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className=" relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            alt="userprofile"
            className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-40 bg-gray-50  shadow-xl rounded-lg absolute top-12 right-0 flex flex-col"
            >
              {user && user.email === 'naviti.it@gmail.com' && (
                <Link to={'/createItem'}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <li
                  className=" text-base text-textColor hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                >
                  Home
                </li>
                <li
                  className=" text-base text-textColor hover:text-headingColor hover:bg-slate-100 
                duration-100 transition-all ease-in-out cursor-pointer selection:hover:bg-slate-100 px-4 py-2"
                >
                  Menu
                </li>
                <li
                  className=" text-base text-textColor hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                >
                  About Us
                </li>
                <li
                  className=" text-base text-textColor hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                >
                  Service
                </li>
              </ul>
              <p
                className="m-2 p-2 flex items-center gap-3 cursor-pointer justify-center bg-gray-200 rounded-md shadow-md
              hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
