import { combineReducers } from "redux";
import fetchProductsReducer from "./fetchProductsReducer";
import storage from 'redux-persist/lib/storage'
import cartReducer from "./cartReducer";
import {persistReducer} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    products: fetchProductsReducer,
    cart: cartReducer,
})

export default persistReducer(persistConfig, rootReducer)