import { useState } from "react"
import { assets } from "../assets/assets"
import CartTotal from "../components/cart/CartTotal"
import InputComponent from "../components/PlaceOrder/InputComponent"
import Tittle from "../components/Tittle"
import { useNavigate } from "react-router-dom"


function PlaceOrder() {

  const [paymentMethod, setPaymentMethod] = useState('')

  const navigation = useNavigate()

  return (
    <div className="flex flex-col lg:flex-row lg:justify-around lg: items-center">



      <div className="max-w-[600px] flex flex-col">

        <Tittle title1="INFORMAÇÕES" title2="DE ENTREGA" />


        <div className="flex gap-2 w-full">
          <InputComponent placeHolder="Primeiro Nome" />

          <InputComponent placeHolder="Segundo Nome" />

        </div>

        <InputComponent placeHolder="Endereço de Email" />

        <InputComponent placeHolder="Rua" />

        <div className="flex gap-2">
          <InputComponent placeHolder="Cidade" />
          <InputComponent placeHolder="Estado" />
        </div>

        <div className="flex gap-2">
          <InputComponent placeHolder="Cep" />
          <InputComponent placeHolder="Pais" />
        </div>

        <InputComponent placeHolder="Telefone" />


      </div>


      <div className="flex flex-col items w-full max-w-[500px]">


        <CartTotal />


        <div className="flex flex-col gap-4 ">

          <Tittle title1="METODO DE" title2="PAGAMENTO" />


          <div className="flex justify-around gap-6">

            <button onClick={() => setPaymentMethod('stripe')} className="px-8 py-1 flex items-center gap-2 border border-gray-300 text-center">
              <div className={`w-3 h-3 border border-gray-300 rounded-full flex ${paymentMethod === 'stripe' ? 'bg-green-400' : ''}`} />
              <img className="w-18" src={assets.stripe_logo} />

            </button>




            <button onClick={() => setPaymentMethod('razorpay')} className="px-8 gap-2 py-1 flex items-center border border-gray-300 text-center">
              <div className={`w-3 h-3 border border-gray-300 rounded-full flex ${paymentMethod === 'razorpay' ? 'bg-green-400' : ''}`} />
              <img className="w-18" src={assets.razorpay_logo} />

            </button>



          </div>

        </div>

        <div className="w-full mt-10 flex justify-center">
          <button onClick={() => navigation('/orders')} className="px-8 py-3 w-full max-w-[300px] text-center rounded bg-black text-white text-xl">Order</button>
        </div>

      </div>

    </div>
  )
}

export default PlaceOrder