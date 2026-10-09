import { useContext } from "react";
import { ShopContext, type CartItem } from "../context/ShopContext";
import CartTotal from "../components/cart/CartTotal";
import { useNavigate } from "react-router-dom";



function CartProduct() {

    const navigation = useNavigate()

    const { cart, currency, products, removeProduct, addToCart, cartToggle, setCartToggle } = useContext(ShopContext)!;

    function handleCheckout() {
        navigation("/place-order");
        setCartToggle(false);
    }


    return (
        <>
            <div
                onClick={() => setCartToggle(false)}
                className={`fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity duration-300 ease-in-out ${cartToggle ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />

            <aside

                aria-hidden={!cartToggle}
                className={`fixed top-0 right-0 z-50 h-full w-[85%] sm:w-[420px] bg-white shadow-2xl  transition duration-500 ease-in-out will-change-transform ${cartToggle ? "translate-x-0" : "translate-x-full invisible"}`}
            >


                <div className="flex items-center justify-between px-4 pt-4">
                    <p className="text-xl font-medium">Carrinho</p>
                    <button onClick={() => setCartToggle(false)} aria-label="Fechar carrinho" className="text-2xl px-2">&times;</button>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4">

                    {cart && cart.length > 0 ? (
                        cart.map((item: CartItem) => {


                            let findItems = products?.find(product => product._id === item.productId)



                            return (
                                <div key={item.productId} className="border-t  border-b border-gray-200 p-4 min-w-full w-full">
                                    <div className="flex justify-between items-center">


                                        <div className="flex gap-4 ">
                                            <img className="w-20 h-20 object-contain" src={findItems?.image[0]} alt={findItems?.name} />

                                            <div>
                                                <p className="">{findItems?.name}</p>
                                                <div className="flex items-center gap-4">
                                                    <p className="bg-gray-100 w-fit p-1">{item.size}</p>
                                                    <p className="">{currency}{(findItems?.price! * item.quantity).toFixed(2)} </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="flex items-center gap-2">
                                            <button onClick={() => addToCart!({ productId: item.productId, quantity: 1, size: item.size })}
                                                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition-colors duration-200"
                                            // onClick={...}
                                            >
                                                +
                                            </button>
                                            <p className="text-sm">{item.quantity}</p>
                                            <button
                                                onClick={() => removeProduct!(item.productId, item.size)}
                                                className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-400 transition-colors duration-200"
                                            // onClick={...}
                                            >
                                                -
                                            </button>


                                        </div>


                                    </div>




                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center">Seu carrinho está vazio</div>
                    )}

                    {cart && cart.length > 0 && (
                        <div className="flex justify-end mt-4 mx-4">
                            <div className="w-full md:w-[400px]">

                                <CartTotal />

                                <div onClick={() => handleCheckout()} className="bg-black text-center cursor-pointer text-white mt-6 px-6 py-4 rounded">
                                    <p className="text-xl">Finalizar compra</p>
                                </div>

                            </div>

                        </div>
                    )}

                </div>


            </aside>
        </>
    )
}

export default CartProduct