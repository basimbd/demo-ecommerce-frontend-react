import { Dialog, Transition } from '@headlessui/react'
import {Fragment, useContext} from 'react'
import {useHistory} from "react-router-dom";
import ProductCheckoutCard from "./ProductCheckoutCard";
import {ProductsContext} from "../contexts/productsContext/ProductsContext";
import {ACTIONS} from "../actions";

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
            console.log("Result OK!")
            history.replace({
                pathname: '/checkout_complete',
                state: Object.fromEntries(selectedProducts)
            });
            removeAllProducts();
            console.log("Checkout Complete")
            return null
        }).catch(() => {
            history.push('/checkout_failed');
        }).finally(() => {
            closeModal();
        });
    }

    if(isOpen){
        return (
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed top-0 right-0 bottom-auto z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-128 h-screen max-w-md p-6 overflow-y-scroll text-center align-middle transition-all transform bg-white shadow-xl rounded-tl-2xl rounded-bl-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex flex-row justify-between items-center text-lg font-medium leading-6 text-gray-900"
                                    >
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
                                    </Dialog.Title>
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
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    } else{
        return null
    }
}
