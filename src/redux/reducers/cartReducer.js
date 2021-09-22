import {CART_ACTIONS} from "../actionTypes/cartActionTypes";

const initialState = {}

export default function cartReducer(state=initialState, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM:
            state[action.payload.id] = action.payload            //here, action.payload contains full product
            return {...state}
        case CART_ACTIONS.DELETE_ITEM:
            delete state[action.payload]                           // here, action.payload contains only product id
            return {...state}
        case CART_ACTIONS.UPDATE_ITEM:
            state[action.payload.product_id].selectedAmount = parseInt(action.payload.selectedAmount)  //here, action.payload contains an object ->
            return {...state}                                                                          //                             {product_id, selectedAmount}
        case CART_ACTIONS.INCREMENT_ITEM:
            state[action.payload].selectedAmount += 1            // here, action.payload contains only product id
            return {...state}
        case CART_ACTIONS.DECREMENT_ITEM:
            state[action.payload].selectedAmount -= 1            // here, action.payload contains only product id
            return {...state}
        case CART_ACTIONS.DELETE_ALL:
            return {}
        default:
            return state
    }
}