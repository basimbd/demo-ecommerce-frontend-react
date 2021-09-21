import {applyMiddleware, createStore} from "redux";
import { persistStore} from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import persistReducer from "../reducers/rootReducer";

export const store = createStore(persistReducer, applyMiddleware(thunkMiddleware))

export const persistor = persistStore(store)