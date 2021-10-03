import { fetchData } from "../../utils/fetchDataFromApi";
import { FetchProductsActionTypes } from "../actionTypes/fetchProductsActionTypes";
import {store} from "../store/store";

export function loadProducts(){
    return function (dispatch){
        const state = store.getState()
        if(!state.products.allProducts.length){
            dispatch(fetchProducts)
        }
    }
}

export function fetchProducts(dispatch) {
    dispatch(setFetchRequest())
    fetchData('https://fakestoreapi.com/products')
        .then(data => {
            dispatch(setFetchComplete(data))
        })
        .catch(err => {
            dispatch(setFetchFailed(err))
        })
}

export function setFetchRequest() {
    return {
        type: FetchProductsActionTypes.FETCH_REQUEST,
    }
}

export function setFetchComplete(data){
    return {
        type: FetchProductsActionTypes.FETCH_COMPLETE,
        payload: data,
    }
}

export function setFetchFailed(err) {
    return {
        type: FetchProductsActionTypes.FETCH_FAILED,
        payload: err,
    }
}
