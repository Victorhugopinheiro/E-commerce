import { useContext } from "react"
import ImgModel from "./ImgModel"
import Tittle from "./Tittle"
import { ShopContext } from "../context/ShopContext"


function LastestsCollections() {

    const {  currency, latesteProducts } = useContext(ShopContext)!

    return (
        <div className="my-8">

            <div className="flex justify-center items-center flex-col ">
                <Tittle title1="ULTIMOS" title2="LANÇAMENTOS" />

                <p className="text-gray-600 max-w-6/12 text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Excepturi velit consequuntur nesciunt consectetur, fugiat doloribus eligendi laboriosam
                    repellat vero impedit quod numquam veniam.
                </p>

            </div>



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {latesteProducts!.map((product) => (
                    <ImgModel
                        key={product._id}
                        url={product.image[0]}
                        title={product.name}
                        price={`${product.price} ${product.category}`}
                        currency={currency}
                    />
                ))}
            </div>



        </div>
    )
}

export default LastestsCollections