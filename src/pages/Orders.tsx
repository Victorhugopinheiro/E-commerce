import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Tittle from "../components/Tittle"


function Orders() {

  const { products, currency } = useContext(ShopContext)!

  return (
    <div className="flex flex-col">
        <Tittle title1="MEUS" title2="PEDIDOS"/>
      {

        products?.slice(0, 4).map((item, index) => (
          <div key={index} className="border-t border-b py-3 border-gray-300 flex items-center justify-between">

            <div className="flex gap-4">
              <img className="w-26" src={item.image[0]} />


              <div className="flex flex-col py-2 justify-around">

                <p>{item.name}</p>

                <div className="flex gap-2">
                  <p>{currency} {item.price}</p>
                  <p>Quntidade: 1</p>
                  <p>Tamanho: {item.sizes[0]}</p>
                </div>

                <p>Data: <span className="text-gray-500">25, Julho, 2025</span></p>
              </div>
            </div>



            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"/>
              <p>Pronto para entrega</p>

            </div>


          <div className="border cursor-pointer border-gray-300 px-3 py-2">

            <p className="">Rastrear pedido</p>
            

          </div>

          </div>



        ))


      }

    </div>
  )
}

export default Orders