import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore'
import { firestore } from '../firebase.config'
import { FoodItem } from '../Interfaces/intarface'



/* Saving new Item */


export const saveItem = async (data: FoodItem) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, {
        merge: true,
    })
}

/* Get all food items */


export const getAllFoodItems = async () => {
    const items = await getDocs(query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
    );
    return items.docs.map((doc)=>doc.data())
}