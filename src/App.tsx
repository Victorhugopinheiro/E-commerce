import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Collection from "./pages/Collection"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Orders from "./pages/Orders"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Search from "./components/Search"
  import { ToastContainer } from 'react-toastify';


function App() {
   return (
      <div className="px-4 sm:px-[5vh] md:px-[2vh] lg:px-[20vh]">
         <Navbar/>
          <Search/>
          <ToastContainer />
         <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/product/:id" element={<Product />} />
         </Routes>

        

         <Footer/>
      </div>
   )
}

export default App