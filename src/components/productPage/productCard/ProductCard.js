import {ACTIONS} from "../../actions";

import {useContext} from "react";
import {ProductsContext} from "../../contexts/productsContext/ProductsContext";

function ProductCard(product) {
    const [selectedProducts, dispatch] = useContext(ProductsContext)

    const removeProduct = () => {
        dispatch({
            type: ACTIONS.DELETE,
            data: {
                product: {id:product.id},
            },
        });
    }

    const increment = () => {
        // In this full scope, selectedAmount is the prevAmount value, not the updated one.
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
        if(selectedProducts.get(product.id).selectedAmount === 1){
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

    return (
        <div className="mx-16 sm:mx-3">
            <div className="h-96 sm:h-100 lg:h-104 xl:h-112 2xl:h-120 group relative shadow-md">
                <div className="w-full p-2 lg:p-4 bg-gray-200 rounded-md group-hover:opacity-75 h-88 sm:h-92 lg:h-96 xl:h-100 2xl:h-104">
                    <img
                        src={product.image}
                        alt={product.category}
                        className="w-full h-full object-center lg:object-cover lg:w-full lg:h-full"
                    />
                </div>
                <div className="mt-1 sm:mt-2 xl:mt-4 flex justify-between">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg px-1 text-left whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-700" title={product.title}>
                        {product.title}
                    </h3>
                    <div><span className="text-sm px-1 lg:py-1 font-medium rounded-md bg-indigo-100 text-gray-900">${product.price}</span></div>
                </div>
            </div>
            {selectedProducts.has(product.id) ?
                (<div className="flex flex-row flex-wrap justify-around items-center p-1 rounded-br-xl rounded-bl-xl text-white bg-indigo-600">
                    <div className="flex flex-row">
                        <button className="flex m-1 pb-1 justify-center items-center rounded-sm w-5 h-5 text-gray-800 bg-yellow-300 hover:bg-yellow-500 disabled:opacity-50" disabled={selectedProducts.get(product.id).selectedAmount === 0} onClick={decrement}>
                            <span>&minus;</span> {/*for minus sign */}
                        </button>
                        <span className="m-1">{selectedProducts.get(product.id).selectedAmount}</span>
                        <button className="flex m-1  pb-1 justify-center items-center rounded-sm w-5 h-5 text-gray-800 bg-yellow-300 hover:bg-yellow-500" onClick={increment}>
                            +
                        </button>
                    </div>
                    <span className="p-1 bg-yellow-300 rounded-sm hover:bg-yellow-500 text-gray-800 cursor-pointer" onClick={removeProduct}>Remove From Cart</span>
                </div>) :
                (<div className="p-2 rounded-br-xl rounded-bl-xl text-white bg-indigo-600">
                    <span className="p-1 bg-yellow-300 rounded-sm cursor-pointer hover:bg-yellow-500 text-gray-800" onClick={increment}>Add To Cart</span>
                </div>)
            }
        </div>
    )
}

export default ProductCard