import * as React from 'react'
import { createContext, useContext, useReducer } from 'react'
import { InitialStateType } from '../Interfaces/intarface'
import { Actions } from './reducer'

interface ProviderContextProps {
	reducer: (state: InitialStateType, action: Actions) => InitialStateType
	initialState: InitialStateType
	children?: JSX.Element | JSX.Element[]
}


export const StateContext = createContext<[InitialStateType, React.Dispatch<Actions>]>([
	{ user: null, foodItems: null, cartShow: false, cartItems: null },
	() => {}
]);


export const StateProvider: React.FC<ProviderContextProps> = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);