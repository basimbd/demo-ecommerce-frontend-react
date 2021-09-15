export default function CheckoutFailed() {
    return (
        <div className="top-56 mx-auto p-4 max-w-max rounded-md bg-red-300 text-gray-800">
            <h1 className="text-5xl">Oops!</h1>
            <p>Order Placement failed. Please check your network connection and try again.</p>
        </div>
    )
}