import { InitialStateType } from '../Interfaces/intarface'
import { fetchCart, fetchUser } from '../utils/fetchLocalStorageData';

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState:InitialStateType = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
    
}
