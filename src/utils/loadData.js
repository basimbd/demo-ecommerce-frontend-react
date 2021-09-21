import { useDispatch } from "react-redux";
import { fetchFromStorage, fetchProducts } from "../redux/actions/fetchProductsAction";

function getDataFromLocalStorage(itemKey) {
    const data = localStorage.getItem(itemKey)

    if (data){
        console.log("returning: ", JSON.parse(data))
        return JSON.parse(data)
    } else{
        return null
    }
}

export function useLoadData(itemKey){
    const dispatch = useDispatch()
    const data = getDataFromLocalStorage(itemKey)

    if (data){
        //dispatch(setFetchComplete(data))
        dispatch(fetchFromStorage())
    } else{
        dispatch(fetchProducts)
    }
}