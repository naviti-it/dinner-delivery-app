import { OrderItem, FoodItem, InitialStateType, User } from '../Interfaces/intarface'

export enum actionTypes {
	SET_USER = 'SET_USER',
	SET_FOOD_ITEMS = 'SET_FOOD_ITEMS',
	SET_CART_SHOW = 'SET_CART_SHOW',
	SET_CARTITEMS = 'SET_CARTITEMS'
}

export type Actions =
	| { type: actionTypes.SET_USER; user: User }
	| { type: actionTypes.SET_FOOD_ITEMS; foodItems: Array<FoodItem> }
	| { type: actionTypes.SET_CART_SHOW; cartShow: boolean }
	| { type: actionTypes.SET_CARTITEMS; cartItems: Array<OrderItem> }


const reducer = (state: InitialStateType, action: Actions) => {

    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state, user: action.user,
            }

        case actionTypes.SET_FOOD_ITEMS:
            return {
                ...state, foodItems : action.foodItems,
            }

        case actionTypes.SET_CART_SHOW:
            return {
                ...state, cartShow : action.cartShow,
            }

        case actionTypes.SET_CARTITEMS:
            return {
                ...state, cartItems : action.cartItems,
            }


        default: return state

    }
}

export default reducer;