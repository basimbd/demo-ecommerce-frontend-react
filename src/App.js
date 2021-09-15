import logo from './logo.svg';
import './App.css';
import Main from "./components/main/Main";
import ProductsContextProvider from "./components/contexts/productsContext/ProductsContextProvider";

function App() {
  return (
      <ProductsContextProvider>
          <Main />
      </ProductsContextProvider>
  );
}

export default App;
