import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import ProductCheckoutCard from "../../checkout/ProductCheckoutCard";
import {calculateDeliveryFee, calculateGrandTotal, calculateSubTotal} from "../../../utils/calculations";
import {addToCart, decrement, increment, removeFromCart} from "../../../redux/actions/cartAction";
import {useDispatch, useSelector} from "react-redux";

export default function ProductPreview({product, showPreview, closePreview}){
    const dispatch = useDispatch()
    const selectedProducts = useSelector(state => {
        return state.cart
    })

    function decrementAmount(){
        if(selectedProducts[product.id].selectedAmount > 1){
            dispatch(decrement(product.id))
        } else if(selectedProducts[product.id].selectedAmount === 1){
            dispatch(removeFromCart(product.id))
        }
    }
    return (
        <>
            <Transition appear show={showPreview} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-30 overflow-y-auto"
                    onClose={closePreview}
                >
                    <div className="px-2 md:px-4 text-center">
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
                            <div className="inline-block p-3 md:p-6 my-4 md:my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="flex justify-end mb-2"><div className="transform rotate-45 cursor-pointer text-4xl" onClick={closePreview}>+</div></div>
                                <Dialog.Title
                                    as="h3"
                                    className="flex flex-row justify-between items-center text-lg font-medium leading-6 text-gray-900"
                                >
                                    <span>Product Preview</span>
                                </Dialog.Title>
                                <div className="max-w-5xl flex items-center h-auto flex-wrap mx-auto my-8 md:my-16 lg:my-32 lg:my-0">
                                    <div id="profile"
                                         className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-90 mx-auto md:mx-6 lg:mx-0"
                                    >
                                        <div className="p-2 sm:p-4 md:p-12 text-center lg:text-left">
                                            {/*<!-- Image for mobile view-->*/}
                                            <div className="block lg:hidden rounded-full shadow-xl mx-auto h-48 w-48">
                                                <img
                                                    src={product.image}
                                                    className="w-full h-full"
                                                />
                                            </div>

                                            <h1 className="text-base md:text-xl lg:text-3xl font-bold pt-8 lg:pt-0">{product.title}</h1>
                                            <hr className="mx-auto lg:mx-0 w-4/5 border-2 border-indigo-600 opacity-25"/>
                                            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                                <svg className="h-4 fill-current text-indigo-600 pr-4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 235.517 235.517" style={{enableBackground: "new 0 0 235.517 235.517"}} xmlSpace="preserve">
                                                    <g>
                                                        <path d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473   c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549   c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251   c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843   c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021   c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029   c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12   c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549   c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"/>

                                                    </g>
                                                </svg>
                                                {product.price}
                                            </p>
                                            <p className="pt-8 text-sm">
                                                {product.description}
                                            </p>

                                            <div className="pt-12 pb-8">
                                                {selectedProducts[product.id] ?
                                                    (
                                                        <div
                                                            className="flex flex-row flex-wrap justify-around items-center w-full bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full outline-none">
                                                            <div className="flex flex-row">
                                                                <button
                                                                    className="flex m-1 pb-1 justify-center items-center rounded-sm w-5 h-5 text-gray-800 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50"
                                                                    disabled={selectedProducts[product.id].selectedAmount === 0}
                                                                    onClick={decrementAmount}
                                                                >
                                                                    <span>&minus;</span>
                                                                </button>
                                                                <span className="m-1">{selectedProducts[product.id].selectedAmount}</span>
                                                                <button
                                                                    className="flex m-1 pb-1 justify-center items-center rounded-sm w-5 h-5 text-gray-800 bg-yellow-400 hover:bg-yellow-500"
                                                                    onClick={() => dispatch(increment(product.id))}>
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span
                                                                className="py-1 px-2 bg-yellow-300 hover:bg-yellow-500 text-gray-800 rounded-sm cursor-pointer"
                                                                onClick={() => dispatch(removeFromCart(product.id))}>Remove From Cart</span>
                                                        </div>
                                                    ) :
                                                    (
                                                        <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full outline-none"
                                                                onClick={() => dispatch(addToCart({...product, selectedAmount: 1}))}
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    )
                                                }
                                            </div>

                                            {/*<div
                                                className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
                                                <a className="link" href="#" data-tippy-content="@facebook_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title>
                                                        <path
                                                            d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@twitter_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title>
                                                        <path
                                                            d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@github_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title>
                                                        <path
                                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@unsplash_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Unsplash</title>
                                                        <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@dribble_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title>
                                                        <path
                                                            d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@instagram_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title>
                                                        <path
                                                            d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                                    </svg>
                                                </a>
                                                <a className="link" href="#" data-tippy-content="@youtube_handle">
                                                    <svg className="h-6 fill-current text-gray-600 hover:text-green-700" role="img"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube</title>
                                                        <path
                                                            d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                                                    </svg>
                                                </a>
                                            </div>*/}
                                        </div>

                                    </div>

                                    <div className="w-full lg:w-2/5">
                                        <img src={product.image}
                                             className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"/>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

