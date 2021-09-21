import {CART_ACTIONS} from "../actionTypes/cartActionTypes";

export function addToCart(product){
    return {
        type: CART_ACTIONS.ADD_ITEM,
        payload: product,
    }
}

export function removeFromCart(product_id){
    return {
        type: CART_ACTIONS.DELETE_ITEM,
        payload: product_id,
    }
}

export function updateProductAmount(product_id, selectedAmount){
    return {
        type: CART_ACTIONS.UPDATE_ITEM,
        payload: {product_id, selectedAmount},
    }
}

export function increment(product_id){
    return {
        type: CART_ACTIONS.INCREMENT_ITEM,
        payload: product_id,
    }
}

export function decrement(product_id){
    return {
        type: CART_ACTIONS.DECREMENT_ITEM,
        payload: product_id,
    }
}

export function deleteAllFromCart(){
    return {
        type: CART_ACTIONS.DELETE_ALL
    }
}