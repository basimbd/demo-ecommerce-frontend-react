import {ACTIONS} from "../../actions";

export default function ProductsContextReducer(state, {type, data:{product, selectedAmount}}){
    switch (type) {
        case ACTIONS.UPDATE: {
            state.set(product.id, {...product, selectedAmount})
            return new Map(state)
        }
        case ACTIONS.DELETE: {
            state.delete(product.id)
            return new Map(state)
        }
        case ACTIONS.DELETE_ALL:{
            return new Map()
        }
        default:
            return state
    }
}