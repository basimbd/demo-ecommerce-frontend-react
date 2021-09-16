import ProductCheckoutCard from "./ProductCheckoutCard";

export default function CheckoutComplete({state}) {
    console.log("FROM Complete Page:", typeof state)

    const calculateTotal = () => {
        let sum = 0;
        Object.entries(state).forEach(([key, value]) => ( sum += (value.price * value.selectedAmount) ) );
        return sum;
    }

    return (
        <div className="max-w-3xl sm:max-w-4xl md:max-w-6xl xl:max-w-7xl mx-auto">
            <div className="top-56 mx-auto p-4 max-w-max rounded-md bg-green-200 text-gray-800">
                <h1 className="text-5xl">Hurray!</h1>
                <p>Order Placement successfully completed.</p>
            </div>
            <ul className="mx-auto max-w-2xl">
                {Object.keys(state).map((mapKey) => <li key={mapKey}><ProductCheckoutCard {...{product:state[mapKey], type:"checkoutComplete"}}/></li>)}
            </ul>
            <div  className="mx-auto max-w-2xl mb-16">
                <div className="flex flex-row justify-end px-2">
                    <span>{`Sub-total Amount = $${calculateTotal()}`}</span>
                </div>
                <hr className="my-2 border-2 border-indigo-600"/>
                <div className="flex flex-row justify-end px-2">
                    <span>{`Delivery Fee = $11`}</span>
                </div>
                <hr className="my-2 border-2 border-indigo-600"/>
                <div className="flex flex-row justify-end px-2">
                    <span>{`Total Amount = $${(parseFloat(calculateTotal())+11).toFixed(2)}`}</span>
                </div>
            </div>
        </div>
    )
}