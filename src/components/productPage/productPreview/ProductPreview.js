import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {addToCart, decrement, increment, removeFromCart} from "../../../redux/actions/cartAction";
import {useDispatch, useSelector} from "react-redux";
import {StarIcon} from "@heroicons/react/solid";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
                                <div className="max-w-5xl flex items-center h-auto flex-wrap mx-auto my-6">
                                    <div id="profile"
                                         className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-90 mx-auto md:mx-6 lg:mx-0"
                                    >
                                        <div className="p-2 sm:p-4 md:p-12 text-center lg:text-left">
                                            {/*<!-- Image for mobile view-->*/}
                                            <div className="block lg:hidden rounded-full shadow-xl mx-auto h-48 w-48">
                                                <img
                                                    src={product.image}
                                                    className="w-full h-full"
                                                    alt={product.title}
                                                />
                                            </div>

                                            <h1 className="text-base md:text-xl lg:text-3xl font-bold pt-4 lg:pt-0">{product.title}</h1>
                                            <hr className="mx-auto lg:mx-0 w-4/5 border border-indigo-600 opacity-25"/>
                                            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                                                <svg className="h-4 fill-current text-indigo-600 pr-4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 235.517 235.517" style={{enableBackground: "new 0 0 235.517 235.517"}} xmlSpace="preserve">
                                                    <g>
                                                        <path d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473   c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549   c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251   c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843   c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021   c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029   c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12   c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549   c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"/>

                                                    </g>
                                                </svg>
                                                {product.price}
                                            </p>
                                            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start" title={product.rating.rate}>
                                                {
                                                    [...Array(5)].map((_, idx) =>
                                                        <StarIcon className=
                                                                      {classNames(Math.ceil(parseInt(product.rating.rate)-0.5)>=(idx+1) ? "text-yellow-400"
                                                                          : "text-gray-400", "w-6 h-6")}
                                                        />
                                                    )
                                                }
                                                <span className="ml-2 text-xs">{product.rating.count} ratings</span>
                                            </p>
                                            <p className="pt-8 text-sm">
                                                {product.description}
                                            </p>

                                            <div className="pt-8 pb-4">
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
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-2/5">
                                        <img src={product.image}
                                             className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                                            alt={product.title}
                                        />
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

