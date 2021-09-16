import Navbar from "../navbar/Navbar";
import ProductPage from "../productPage/ProductPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CheckoutComplete from "../checkout/CheckoutComplete";
import CheckoutFailed from "../checkout/CheckoutFailed";
import AboutUs from "../about_us/AboutUs";
import Faq from "../faq/Faq";

export default function Main(){
    return (
        <Router>
            <div className="text-center">
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <ProductPage />
                    </Route>
                    <Route exact path="/checkout_complete" render={
                        ({location}) => <CheckoutComplete {...location} />
                    }/>
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
                {/*<CheckoutModal />*/}
            </div>
        </Router>
    )
}