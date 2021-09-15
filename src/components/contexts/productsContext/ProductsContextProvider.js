import {ProductsContext} from "./ProductsContext";
import {useReducer} from "react";
import ProductsContextReducer from "./ProductsContextReducer";

export default function ProductsContextProvider({ children }){
    const [selectedProducts, dispatch] = useReducer(ProductsContextReducer, new Map())

    return (
        <ProductsContext.Provider value={[selectedProducts, dispatch]}>
            { children }
        </ProductsContext.Provider>
    )
}