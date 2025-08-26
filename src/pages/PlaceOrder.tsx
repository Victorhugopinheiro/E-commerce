import { assets } from "../assets/assets"
import CartTotal from "../components/cart/CartTotal"
import InputComponent from "../components/PlaceOrder/InputComponent"
import Tittle from "../components/Tittle"


function PlaceOrder() {
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


      <div className="flex flex-col w-full max-w-[500px]">


        <CartTotal />


        <div className="flex flex-col gap-4 ">

          <Tittle title1="METODO DE" title2="PAGAMENTO" />


          <div className="flex justify-around gap-6">

            <button className="px-8 py-1  border border-gray-300 text-center">
              <img className="w-18" src={assets.stripe_logo} />

            </button>


            <button className="px-8 py-1  border border-gray-300 text-center">
              <img className="w-18" src={assets.razorpay_logo} />

            </button>

            <button className="px-8 py-1  border border-gray-300 text-center">
              <img className="w-18" src={assets.stripe_logo} />

            </button>


          </div>

        </div>

      </div>

    </div>
  )
}

export default PlaceOrder