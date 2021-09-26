import {useContext} from 'react'
import {useHistory} from "react-router-dom";
import ProductCheckoutCard from "./ProductCheckoutCard";
import {ProductsContext} from "../contexts/productsContext/ProductsContext";
import {ACTIONS} from "../actions";
import Modal from "../reusables/modal";

export default function CheckoutModal({isOpen, closeModal}) {
    const [selectedProducts, dispatch] = useContext(ProductsContext);
    const history = useHistory();

    const clearCart = () => {
        if(window.confirm("Are you sure you want to remove all products?")){
            removeAllProducts();
            closeModal();
        }
    }

    const removeAllProducts = () => {
        dispatch({
            type: ACTIONS.DELETE_ALL,
            data: {}
        });
    }

    const calculateTotal = () => {
        let sum = 0;
        selectedProducts.forEach(({price, selectedAmount}) => ( sum += (price * selectedAmount) ) );
        return sum;
    }

    const proceedToCheckout = () => {
        const postApiAddress = 'https://webhook.site/a444ecee-4efd-4ccf-8d13-6d8e295ffcfe';
        fetch(postApiAddress, {
            method: 'post',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(selectedProducts))
        }).then(() => {
            history.replace({
                pathname: '/checkout_complete',
                state: Object.fromEntries(selectedProducts)
            });
            removeAllProducts();
            return null
        }).catch(() => {
            history.push('/checkout_failed');
        }).finally(() => {
            closeModal();
        });
    }

    return (
        <Modal
            title={
                <>
                    <span>Selected Products</span>
                    {
                        selectedProducts.size ? (
                            <button
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        ) : null
                    }
                </>
            }
            isOpen={isOpen}
            closeModal={closeModal}
            position="right"
            fullscreen={true}
            scroll={true}
        >
            <ul className="mt-2">
                {
                    Array.from(selectedProducts).map(([id,product]) => <li key={id}><ProductCheckoutCard {...{product, type: "checkoutModal"}} /></li>)
                }
            </ul>

            {selectedProducts.size ? (
                <>
                    <div className="flex flex-row justify-end px-2">
                        <span>{`Sub-total Amount = $${calculateTotal()}`}</span>
                    </div>
                    <hr className="my-2 border-2 border-indigo-600"/>
                    <div className="flex flex-row justify-between">
                        <button className="bg-transparent text-indigo-600 text-left hover:text-indigo-800">Do you have a voucher?</button>
                    </div>
                    <hr className="my-2 border-2 border-indigo-600"/>
                    <div className="flex flex-row justify-end px-2">
                        <span>{`Delivery Fee = $11`}</span>
                    </div>
                    <hr className="my-2 border-2 border-indigo-600"/>
                    <div className="flex flex-row justify-end px-2">
                        <span>{`Total Amount = $${(parseFloat(calculateTotal())+11).toFixed(2)}`}</span>
                    </div>
                </>
            ) : null}
            <div className="mt-4">
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md disabled:opacity-30 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={proceedToCheckout}
                    disabled={!selectedProducts.size}
                >
                    Proceed To Checkout
                </button>
            </div>
        </Modal>
    )
}
