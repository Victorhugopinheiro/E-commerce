import { useContext } from "react";
import ImgModel from "./ImgModel";
import Tittle from "./Tittle";
import { ShopContext } from "../context/ShopContext";



function BestSallers() {

    const {  bestSallers, currency } = useContext(ShopContext)!

    return (
        <div className="my-8">

            <div className="flex justify-center items-center flex-col ">
                <Tittle title1="MELHORES" title2="OFERTAS" />

                <p className="text-gray-600 max-w-6/12 text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Excepturi velit consequuntur nesciunt consectetur, fugiat doloribus eligendi laboriosam
                    repellat vero impedit quod numquam veniam.
                </p>

            </div>



            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {bestSallers!.map((product) => (
                    <ImgModel
                        key={product._id}
                        url={product.image[0]}
                        title={product.name}
                        price={`${product.price} ${product.category}`}
                        currency={currency}
                        id={product._id}
                    />
                ))}
            </div>


        </div>
    )
}

export default BestSallers