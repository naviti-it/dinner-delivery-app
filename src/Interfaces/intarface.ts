export interface InitialStateType {
	user: User | null
	foodItems: Array<FoodItem> | null
	cartShow: boolean
	cartItems: Array<OrderItem> | null
}

export interface User {
	providerId: string
	uid: string
	displayName: string
	email: string
	photoURL: string
}

export interface FoodItem {
	title: string
	id: string
	imageURL: string
	qty: number
	calories: string
	price: string
	category: string
}

export interface OrderItem {
	id: string
	category: string
	title: string
	imageURL: string
	calories: string
	price: string
	qty: number
}
