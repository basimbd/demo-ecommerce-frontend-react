import {ACTIONS} from "../../actions";

import {useContext, useState} from "react";
import {ProductsContext} from "../../contexts/productsContext/ProductsContext";

function ProductCard(product) {
    const [selectedProducts, dispatch] = useContext(ProductsContext)
    //const [isAdded, setIsAdded] = useState(selectedProducts.has(product.id))
    //const [selectedAmount, setSelectedAmount] = useState(0)

    /*const handleAddToCartClick = (e) => {
        console.log("Entered Function!")
        if (!isAdded){
            increment();
            //setIsAdded(true);
        }
    }*/

    const increment = () => {
        // In this full scope, selectedAmount is the prevAmount value, not the updated one.
        //setSelectedAmount(prevAmount => prevAmount+1);
        dispatch({
            type: ACTIONS.UPDATE,
            data: {
                product: {...product},
                selectedAmount: (selectedProducts.has(product.id) ? (selectedProducts.get(product.id).selectedAmount+1) : 1),
            },
        });
    }

    const decrement = () => {
        // In this full scope, selectedAmount is the prevAmount value, not the updated one.
        //setSelectedAmount(prevAmount => prevAmount-1)
        if(selectedProducts.get(product.id).selectedAmount === 1){
            //setIsAdded(false)
            dispatch({
                type: ACTIONS.DELETE,
                data: {
                    product: {id:product.id},
                    selectedAmount: (selectedProducts.get(product.id).selectedAmount-1),
                },
            });
        } else{
            dispatch({
                type: ACTIONS.UPDATE,
                data: {
                    product: {...product},
                    selectedAmount: (selectedProducts.get(product.id).selectedAmount-1),
                },
            });
        }
    }

    /*const handleAmountChange = (e,action) => {
        if(action === "+"){
            increment();
        } else if(action === "-"){
            decrement();
        }
    }*/

    return (
        <div className="mx-3">
            <div className="h-96 lg:h-104 xl:h-112 2xl:h-120 group relative shadow-md">
                <div className="w-full p-4 min-h-80 bg-gray-200 rounded-md group-hover:opacity-75 lg:h-96 xl:h-100 2xl:h-104">
                    <img
                        src={product.image}
                        alt={product.category}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                </div>
                <div className="mt-4 h-12 flex justify-between">
                    {/*<div>

                    </div>*/}
                    <h3 className="h-12 px-1 text-left whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-700">
                        {/*<a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.title}
                            </a>*/}
                        {product.title}
                    </h3>
                    {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                    <div><span className="text-sm p-1 font-medium rounded-md bg-indigo-100 text-gray-900">${product.price}</span></div>
                </div>
            </div>
            {selectedProducts.has(product.id) ?
                (<div className="flex flex-row flex-wrap justify-around items-center p-1 rounded-br-xl rounded-bl-xl text-white bg-indigo-700">
                    <button className="flex justify-center items-center rounded-full w-5 h-5 text-gray-800 bg-yellow-400 disabled:opacity-50" disabled={selectedProducts.get(product.id).selectedAmount === 0} onClick={decrement}>
                        <span >&minus;</span> {/*for minus sign */}
                    </button>
                    <span>{selectedProducts.get(product.id).selectedAmount}</span>
                    <button className="flex justify-center items-center rounded-full w-5 h-5 text-gray-800 bg-yellow-400" onClick={increment}>
                        +
                    </button>
                </div>) :
                (<div className="p-1 rounded-br-xl rounded-bl-xl text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700" onClick={increment}>
                    Add To Cart
                </div>)
            }
        </div>
    )
}

export default ProductCard