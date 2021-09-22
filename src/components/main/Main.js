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
                    <Suspense fallback={<div>Confirming Checkout...</div>}>
                        <Route exact path="/checkout_complete" render={
                            ({location}) => {
                                if(location.state){
                                    return <CheckoutComplete {...location} />
                                } else{
                                    return <Redirect to={{
                                        pathname: "/",
                                    }}/>
                                }
                            }
                        }/>
                    </Suspense>
                    <Route exact path="/checkout_failed">
                        <CheckoutFailed />
                    </Route>
                    <Route exact path="/about_us">
                        <AboutUs />
                    </Route>
                    <Route exact path="/faq">
                        <Faq />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}