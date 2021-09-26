import {useState} from "react";
import ProductCard from "./productCard/ProductCard";
import useLoadProducts from "../../hooks/useLoadProducts";

export default function ProductPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    useLoadProducts("https://fakestoreapi.com/products", "allProducts", setIsLoading, setProducts)

    return (
        <div className="bg-white">
            {isLoading ? (
                <div className="mx-auto text-center w-48 h-48">
                    <svg className="animate-spin" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                        <path fill={"rgba(79, 70, 229)"} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"/>
                    </svg>
                    Loading...
                </div>
            ) : products.length ? (
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 2xl:max-w-9xl 2xl:px-12">
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product) =>
                                <ProductCard key={product.id} {...product} />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto text-2xl text-center mt-56">
                        Network Error. Couldn't fetch the products. Try troubleshooting the network connection and reload.
                    </div>
                )
            }
        </div>
    )
}