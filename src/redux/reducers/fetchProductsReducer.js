import {FetchProductsActionTypes} from "../actionTypes/fetchProductsActionTypes";
const { FETCH_REQUEST, FETCH_COMPLETE, FETCH_FAILED } = FetchProductsActionTypes

const initialState = {
    loading: false,
    allProducts: [],
    errMessage: '',
}

export default function fetchProductsReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                errMessage: '',
            }
        case FETCH_COMPLETE:
            return {
                loading: false,
                allProducts: action.payload,
                errMessage: '',
            }
        case FETCH_FAILED:
            return {
                loading: false,
                allProducts: [],
                errMessage: action.payload,
            }
        default:
            return state
    }
}