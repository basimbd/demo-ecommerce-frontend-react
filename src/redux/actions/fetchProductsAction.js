import { fetchData } from "../../utils/fetchDataFromApi";
import getBase64 from "../../utils/getBase64";
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

function fetchProducts(dispatch) {
    dispatch(setFetchRequest())
    fetchData('https://fakestoreapi.com/products')
        .then(data => {
            Promise.all(
                data.map(async (element) => {
                    const base64Image = await getBase64(element.image)
                    return {...element, image:base64Image}
                })
            ).then(dataArray => {
                dispatch(setFetchComplete(dataArray))
            })
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
