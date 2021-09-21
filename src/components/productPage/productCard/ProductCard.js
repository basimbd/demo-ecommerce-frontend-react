import {useDispatch, useSelector} from "react-redux";
import {addToCart, increment, decrement, removeFromCart} from "../../../redux/actions/cartAction";

export default function ProductCard(product) {
    const selectedProducts = useSelector(state => {
        return state.cart
    })
    const dispatch = useDispatch()

    function decrementAmount(){
        if(selectedProducts[product.id].selectedAmount > 1){
            dispatch(decrement(product.id))
        }
    }

    return (
        <div className="flex flex-col flex-nowrap items-center justify-between rounded-xl mx-auto my-2
            h-80 w-64 sm:h-96 sm:w-72 sm:my-4 md:h-104 md:w-80 md:my-6 lg:h-112 lg:w-88 shadow-md"
        >
            <div className="h-52 w-52 rounded-md sm:h-60 sm:w-60 md:h-64 md:w-64 lg:h-72 lg:w-72">
                <img
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-center"
                />
            </div>
            <div className="w-full mt-1 sm:mt-2 xl:mt-4 flex justify-between">
                <h3 className="w-full text-xs sm:text-sm md:text-base lg:text-lg px-1 text-left text-gray-700" title={product.title}>
                    {product.title}
                </h3>
                <div><span className="text-sm px-1 lg:py-1 font-medium rounded-md bg-indigo-100 text-gray-900">${product.price}</span></div>
            </div>
            {selectedProducts[product.id] ?
                (<div
                    className="flex flex-row flex-wrap justify-around items-center w-full p-1 rounded-br-xl rounded-bl-xl text-white bg-indigo-600">
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
                            className="flex m-1  pb-1 justify-center items-center rounded-sm w-5 h-5 text-gray-800 bg-yellow-400 hover:bg-yellow-500"
                            onClick={() => dispatch(increment(product.id))}>
                            +
                        </button>
                    </div>
                    <span
                        className="p-1 bg-yellow-300 hover:bg-yellow-500 text-gray-800 rounded-sm cursor-pointer"
                        onClick={() => dispatch(removeFromCart(product.id))}>Remove From Cart</span>
                </div>) :
                (<div className="w-full p-2 rounded-br-xl rounded-bl-xl bg-indigo-600">
                    <span
                        className="p-1 bg-yellow-300 hover:bg-yellow-500 rounded-sm cursor-pointer text-gray-800"
                        onClick={() => dispatch(addToCart({...product, selectedAmount: 1}))}>Add To Cart</span>
                </div>)
            }
        </div>
    )
}