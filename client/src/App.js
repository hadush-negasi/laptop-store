import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Account from "./components/Account";
import { Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProductDetail from './components/productDetail';
import SearchProduct from './components/SearchProduct';

function App() {
  
  return (
    <div  >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      
    </div>
  );
}

export default App;
