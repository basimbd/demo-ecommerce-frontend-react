import {useDispatch, useSelector} from "react-redux";
import {updateProductAmount, removeFromCart} from "../../redux/actions/cartAction";
import {calculateItemPrice} from "../../utils/calculations"

export default function ProductCheckoutCard({product, type}){
    console.log("TYPE: ",type)
    const selectedProducts = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleProductAmountChange = (e) => {
        if(e.target.value > 0){
            if ( /^[0-9]+$/.test(e.target.value) ){
                dispatch(updateProductAmount(product.id, e.target.value));
            }
        }
    }

    if(type === "checkoutModal"){
        return (
            <div className="flex flex-col w-full h-40 my-2 p-2 rounded-md border-2 border-gray-400">
                <div className="flex flex-row flex-wrap justify-between">
                    <span className="w-9/12 text-left text-sm">{product.title}</span>
                    <span className="w-2/18"><input className="w-full border-2 border-indigo-600" min="1" type="number" onChange={handleProductAmountChange} value={selectedProducts[product.id].selectedAmount}/></span>
                    <button className="w-1/12" onClick={() => dispatch(removeFromCart(product.id))} title="Delete Product">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#5146e5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-row flex-wrap justify-between overflow-hidden">
                    <div className="justify-start w-20 h-20 aspect-w-4 aspect-h-1 rounded-md overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.category}
                            className="w-full h-full object-center overflow-hidden"
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <span>{`${selectedProducts[product.id].selectedAmount} x $${selectedProducts[product.id].price} = $${calculateItemPrice(selectedProducts[product.id].id)}`}</span>
                    </div>
                </div>
            </div>
        )
    } else if (type === "checkoutComplete"){
        return (
            <div className="flex flex-row justify-between w-full h-40 my-2 p-2 rounded-md border-2 border-gray-400">
                <div className="flex flex-row flex-grow">
                    <div className="justify-start w-32 rounded-md overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.category}
                            className="w-full h-full object-center"
                        />
                    </div>
                    <div className="flex flex-col ml-4">
                        <span className="text-left text-lg">{product.title}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-end">
                    <span>{`${product.selectedAmount} x $${product.price} = $${product.selectedAmount * product.price}`}</span>
                </div>
            </div>
        )
    }
}