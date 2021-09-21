import {store} from "../redux/store/store";

export function calculateSelectedProducts(){
    //const selectedProducts = useSelector(state => state.cart)
    const selectedProducts = store.getState().cart
    let sum = 0;
    Object.entries(selectedProducts).forEach(([id, product]) => ( sum += product.selectedAmount ) );
    return sum;
}

export function calculateItemPrice(product_id){
    //const selectedProducts = useSelector(state => state.cart)
    const selectedProducts = store.getState().cart
    return (selectedProducts[product_id].selectedAmount * selectedProducts[product_id].price).toFixed(2)
}

export function calculateSubTotal(){
    //const selectedProducts = useSelector(state => state.cart)
    const selectedProducts = store.getState().cart
    let sum = 0;
    Object.entries(selectedProducts).forEach(([id, product]) => ( sum += (product.price * product.selectedAmount) ) );
    return sum.toFixed(2);
}

export function calculateDeliveryFee(){
    const deliveryFee = 11
    return deliveryFee
}

export function calculateGrandTotal(){
    const deliveryFee = parseFloat(calculateDeliveryFee())
    const subtotal = parseFloat(calculateSubTotal())
    const grandTotal = deliveryFee+subtotal
    return grandTotal.toFixed(2);
}