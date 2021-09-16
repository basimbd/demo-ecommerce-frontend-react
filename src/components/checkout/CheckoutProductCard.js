export default function CheckoutProductCard(product) {
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
            {/*<button onClick={decrement}>&minus;</button>
            {`Product Title: ${product.title}, Product Desc: ${product.description}, Product Price: ${product.price}, Selected: ${product.selectedAmount}`}
            <button onClick={increment}>+</button>*/}
        </div>
    )
}