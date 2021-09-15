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
            <div className="p-2 group relative shadow-md">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 md:h-80 lg:aspect-none">
                    <img
                        src={product.image}
                        alt={product.category}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.title}
                            </a>
                        </h3>
                        {/*<p className="mt-1 text-sm text-gray-500">{product.color}</p>*/}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
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