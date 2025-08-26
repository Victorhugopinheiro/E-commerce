import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/product/RelatedProducts";


function Product() {

  const productId = useParams()




  const { products, addToCart, currency } = useContext(ShopContext)!;
  const product = products?.find(p => p._id === productId.id);
  const [selectedImage, setSelectedImage] = useState(product?.image[0] || "");
  const [sizeSelected, setSizeSelected] = useState("")

  if (!product) {
    return <div className="text-center ">Produto não encontrado</div>;
  }

  useEffect(() => {
    selectedImage ? setSelectedImage(product.image[0]) : setSelectedImage("");

  }, [productId])

  return (
    <div className="flex flex-col border-t-2 border-gray-200">

      <div className="flex flex-col  md:flex-row my-10 py-10">
        <div className="flex flex-1 flex-col-reverse md:flex-row  gap-5">

          <div className="flex w-full md:w-[calc(20%-0.4rem)] justify-around md:justify-start  md:flex-col   gap-2">
            {product.image.map((item, index) => (
              <img onClick={() => setSelectedImage(item)} className="w-[20%] md:w-full object-contain  shrink-0" key={index} src={item} />
            ))}
          </div>

          <div className="w-full md:w-[80%] ">
            <img className="w-full " src={selectedImage} alt={product.name} />
          </div>



        </div>






        <div className="flex-1 ml-10 flex flex-col">
          <h1 className="text-2xl font-bold mt-2 md:mt-0">{product.name}</h1>
          <div className="flex items-center  mt-2">

            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />


            <p className="ml-2">(204)</p>
          </div>


          <p className="font-bold mt-2 text-2xl">{currency}{product.price}</p>
          <p className="text-xl w-full mt-4 lg:w-10/12">R${product.description}</p>

          <div className="mt-6">
            <p>Selecione o tamanho</p>

            <div className="flex gap-2 mt-2">
              {product.sizes.map((size, index) => (
                <button onClick={() => setSizeSelected(size)} key={index} className={`border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 ${sizeSelected === size ? ' border-gray-800' : ''}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>'


          <button onClick={() => {
            if (addToCart) {
              addToCart({ productId: product._id, quantity: 1, size: sizeSelected })
            }
          }} className="bg-black w-fit text-white px-6 py-3 mt-4 rounded hover:bg-gray-800 transition-colors duration-300">
            Adicionar ao carrinho
          </button>

          <hr className="my-6" />

          <div>
            <p>Produto 100% Original</p>
            <p>Facil retorno e troca em até 7 dias</p>
            <p></p>
          </div>

        </div>


      </div>

      <div className="flex flex-col justify-center mb-10">

        <div className="flex">
          <b className="border border-gray-500 w-fit p-2">Descrição</b>
          <b className="border border-gray-500 w-fit p-2">Comentarios</b>
        </div>

        <div className="flex flex-col gap-6 border border-gray-500 p-6">
          <p>{product.description}</p>

          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, suscipit dignissimos!
            Temporibus nostrum ea molestiae numquam, labore officia quae impedit enim
            provident dolor aperiam mollitia nesciunt reiciendis. Doloribus, ea exercitationem!</p>
        </div>

      </div>

      <RelatedProducts category={product.category} subCategory={product.subCategory} />

    </div>
  )
}

export default Product