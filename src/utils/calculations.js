import {store} from "../redux/store/store";

export function calculateSelectedProducts(){
    const selectedProducts = store.getState().cart
    let sum = 0;
    Object.entries(selectedProducts).forEach(([id, product]) => ( sum += product.selectedAmount ) );
    return sum;
}

export function calculateItemPrice(product_id){
    const selectedProducts = store.getState().cart
    return (selectedProducts[product_id].selectedAmount * selectedProducts[product_id].price).toFixed(2)
}

export function calculateSubTotal(passedSelectedProducts){
    const selectedProducts = store.getState().cart
    let sum = 0;
    if(Object.entries(selectedProducts).length){
        Object.entries(selectedProducts).forEach(([id, product]) => ( sum += (product.price * product.selectedAmount) ) );
        return sum.toFixed(2);
    }else if(passedSelectedProducts){
        Object.entries(passedSelectedProducts).forEach(([id, product]) => ( sum += (product.price * product.selectedAmount) ) );
        return sum.toFixed(2);
    }

}

export function calculateDeliveryFee(){
    const deliveryFee = 11
    return deliveryFee
}

export function calculateGrandTotal(state){
    const deliveryFee = parseFloat(calculateDeliveryFee())
    const subtotal = parseFloat(calculateSubTotal(state))
    const grandTotal = deliveryFee+subtotal
    return grandTotal.toFixed(2);
}