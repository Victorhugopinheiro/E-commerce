import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Tittle from "../components/Tittle"
import api from "../service/api"
import { AuthContext } from "../context/authContext"
import { toast } from "react-toastify"
import type { CreateOrderRequest } from "../types/order"


function Orders() {

  const { products, currency, } = useContext(ShopContext)!
  const { authenticated } = useContext(AuthContext)!

  const [productsOrders, setProductsOrders] = useState<CreateOrderRequest[] | []>([])

  const gettingUserOrders = async () => {
    try {
      const response = await api.post('/api/orders/user-orders', {})


      if (response.data.success) {

        setProductsOrders(response.data.orders)

      
      } else {
        toast.error("Erro ao buscar pedidos")
      }

    } catch (error) {
    }
  }



  useEffect(() => {

    gettingUserOrders()

  }, [authenticated])

  return (
    <div className="flex flex-col">
      <Tittle title1="MEUS" title2="PEDIDOS" />
      {

        productsOrders.map((item, index) => (
          <div key={index} className="">

            {item.items.map((produto, index) => {

              const product = products?.find(p => p._id === produto.productId)
              if (!product) return null;

              return (
                <div key={index} className="flex gap-4 border-t border-b py-3 border-gray-300  items-center justify-between">
                  <img className="w-26" src={product.image[0]} />


                  <div className="flex flex-col py-2 justify-around">

                    <p>{product.name}</p>

                    <div className="flex gap-2">
                      <p>{currency} {product.price}</p>
                      <p>Quntidade: 1</p>
                      <p>Tamanho: {product.sizes[0]}</p>
                    </div>

                    <p>Data: <span className="text-gray-500">25, Julho, 2025</span></p>
                  </div>


                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <p>Pronto para entrega</p>

                  </div>


                  <div className="border cursor-pointer border-gray-300 px-3 py-2">

                    <p className="">Rastrear pedido</p>


                  </div>
                </div>
              )

            })}





          </div>



        ))


      }

    </div>
  )
}

export default Orders