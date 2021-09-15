/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import {useContext, useEffect, useState} from "react";
import ProductCard from "./productCard/ProductCard";
import {ProductsContext} from "../contexts/productsContext/ProductsContext";

/*const products = [
    {
        id: 1,
        title: 'Basic Tee 1',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        title: 'Basic Tee 2',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$65',
        color: 'Black',
    },
    {
        id: 3,
        title: 'Basic Tee 3',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$25',
        color: 'Black',
    },
    {
        id: 4,
        title: 'Basic Tee 4',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$43',
        color: 'Black',
    },
    {
        id: 5,
        title: 'Basic Tee 5',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 6,
        title: 'Basic Tee 6',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        description: "Front of men's Basic Tee in black.",
        price: '$31',
        color: 'Black',
    },
    // More products...
]
*/

export default function ProductPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts().then(
            //do nothing
        );
    }, [])

    async function fetchProducts(){
        const apiAddress = "https://fakestoreapi.com/products"
        try {
            const response = await fetch(apiAddress)
            if(response.ok){
                const results = await response.json()
                console.log(results)
                setIsLoading(false)
                setProducts(results)
            }else{
                console.log("Request Failed: ", response.statusText)
                setIsLoading(false)
            }
        } catch (err) {
            console.log("Error: ", err)
            setIsLoading(false)
        }
    }

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
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 md:mx-2 lg:mx-12 lg:max-w-full lg:px-8">
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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