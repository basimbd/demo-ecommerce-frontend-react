import { Suspense, lazy } from "react";

import Navbar from "../navbar/Navbar";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import ProductPage from "../productPage/ProductPage";


const CheckoutComplete = lazy(() => import("../checkout/CheckoutComplete"))
const CheckoutFailed = lazy(() => import("../checkout/CheckoutFailed"))
const AboutUs = lazy(() => import("../about_us/AboutUs"))
const Faq = lazy(() => import("../faq/Faq"))

export default function Main() {
    return (
        <Router>
            <div className="text-center">
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <ProductPage />
                    </Route>
                    <Route exact path="/checkout_complete" render={
                        ({location}) => {
                            if(location.state){
                                return (
                                    <Suspense fallback={<div>Confirming Checkout...</div>}>
                                        <CheckoutComplete {...location} />
                                    </Suspense>
                                )
                            } else{
                                return <Redirect to={{
                                    pathname: "/",
                                }}/>
                            }
                        }
                    }/>
                    <Route exact path="/checkout_failed">
                        <Suspense fallback={<div>Confirming Checkout...</div>}>
                            <CheckoutFailed />
                        </Suspense>
                    </Route>
                    <Route exact path="/about_us">
                        <Suspense fallback={<div>Loading About Us...</div>}>
                            <AboutUs />
                        </Suspense>
                    </Route>
                    <Route exact path="/faq">
                        <Suspense fallback={<div>Loading FAQs...</div>}>
                            <Faq />
                        </Suspense>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}