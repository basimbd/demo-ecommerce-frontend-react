import ProductCheckoutCard from "./ProductCheckoutCard";
import {calculateGrandTotal, calculateSubTotal} from "../../utils/calculations";

export default function CheckoutComplete({state}) {

    if(state){
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
                        <span>{`Sub-total Amount = $${calculateSubTotal()}`}</span>
                    </div>
                    <hr className="my-2 border-2 border-indigo-600"/>
                    <div className="flex flex-row justify-end px-2">
                        <span>{`Delivery Fee = $11`}</span>
                    </div>
                    <hr className="my-2 border-2 border-indigo-600"/>
                    <div className="flex flex-row justify-end px-2">
                        <span>{`Total Amount = $${calculateGrandTotal()}`}</span>
                    </div>
                </div>
            </div>
        )
    } else{
        return null
    }
}