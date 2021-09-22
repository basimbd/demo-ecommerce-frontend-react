import ProductCard from "./productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../redux/actions/fetchProductsAction";

export default function ProductPage() {
    const dispatch = useDispatch()
    dispatch(loadProducts)
    const {loading, allProducts, errMessage} = useSelector(state => state.products)

    return (
        <div className="bg-white">
            {loading ? (
                <div className="mx-auto text-center w-48 h-48">
                    <svg className="animate-spin" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                        <path fill={"rgba(79, 70, 229)"} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"/>
                    </svg>
                    Loading...
                </div>
            ) : allProducts.length ? (
                <div className="mx-auto max-w-2xl p-4 sm:max-w-4xl lg:max-w-7xl lg:px-8 2xl:max-w-9xl 2xl:px-12">
                    <div className="flex flex-col flex-nowrap md:flex-row md:flex-wrap">
                        {allProducts.map((product) =>
                            <ProductCard key={product.id} {...product} />
                        )}
                    </div>
                </div>
            ) : (
                <div className="mx-auto text-2xl text-center mt-56">
                    {errMessage}
                </div>
            )
            }
        </div>
    )
}