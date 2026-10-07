import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import {
  BadgePercent,
  CreditCard,
  Minus,
  Package2,
  Plus,
  Ruler,
  ShoppingCart,
  ShieldCheck,
  Star,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/product/RelatedProducts";


function Product() {
  const productId = useParams()
  const { products, addToCart, currency } = useContext(ShopContext)!;
  const product = products?.find(p => p._id === productId.id);
  const [selectedImage, setSelectedImage] = useState(product?.image[0] || "");
  const [sizeSelected, setSizeSelected] = useState("")
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (value: number) => `${currency} ${value.toFixed(2).replace(".", ",")}`;
  const originalPrice = product ? Number((product.price * 1.25).toFixed(2)) : 0;
  const discountPercent = product && originalPrice ? Math.round((1 - product.price / originalPrice) * 100) : 0;

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedImage(product.image[0]);
    setSizeSelected("");
    setQuantity(1);
  }, [product]);

  if (!product) {
    return <div className="text-center ">Produto não encontrado</div>;
  }

  return (
    <div className="flex flex-col border-t-2 border-gray-200">
      <div className="flex flex-col gap-10 py-10 md:flex-row">
        <div className="flex flex-1 flex-col-reverse gap-5 md:flex-row">
          <div className="flex w-full justify-around gap-2 md:w-[calc(20%-0.4rem)] md:flex-col md:justify-start">
            {product.image.map((item, index) => (
              <button
                type="button"
                onClick={() => setSelectedImage(item)}
                className={`overflow-hidden rounded-lg border transition-colors ${selectedImage === item ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
                key={index}
              >
                <img className="h-full w-[20%] object-contain md:w-full" src={item} alt={`${product.name} - ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="w-full md:w-[80%]">
            <img className="w-full rounded-2xl object-contain" src={selectedImage} alt={product.name} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 md:ml-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-900">(204)</span>
              <span>•</span>
              <span>Frete calculado no checkout</span>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            <p className="text-lg text-gray-400 line-through">{formatPrice(originalPrice)}</p>
            <span className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white">
              % {discountPercent}% OFF
            </span>
          </div>

          

          <p className="max-w-3xl text-base leading-7 text-gray-700">{product.description}</p>

          <div className="h-px w-full bg-gray-200" />

          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Tamanho</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size, index) => (
                <button
                  type="button"
                  onClick={() => setSizeSelected(size)}
                  key={index}
                  className={`min-w-28 rounded-2xl border px-6 py-3 text-base transition-colors ${sizeSelected === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-900 hover:border-gray-500"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <Ruler className="size-5 text-gray-700" />
                <p className="text-sm font-medium text-gray-900">Tabela de Medidas</p>
              </div>
              <button type="button" className="text-sm text-gray-500 underline underline-offset-4">
                Ver tabela
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center rounded-2xl border border-gray-300">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="px-4 py-4 text-gray-600 transition-colors hover:bg-gray-100"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-12 px-4 text-center text-base font-medium text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="px-4 py-4 text-gray-600 transition-colors hover:bg-gray-100"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  if (addToCart) {
                    addToCart({ productId: product._id, quantity, size: sizeSelected, name: product.name })
                  }
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <ShoppingCart className="size-5" />
                Adicionar ao carrinho
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
              <Truck className="size-5 shrink-0 text-red-500" />
              <p className="text-sm font-semibold text-gray-900">
                FRETE GRÁTIS <span className="font-normal text-gray-600">a partir de R$ 199</span>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                <Package2 className="size-5 shrink-0 text-gray-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Categoria</p>
                  <p className="text-sm font-semibold text-gray-900">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                <ShieldCheck className="size-5 shrink-0 text-gray-700" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Garantia</p>
                  <p className="text-sm font-semibold text-gray-900">Troca fácil em até 7 dias</p>
                </div>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                <RefreshCcw className="size-5 text-gray-700" />
                <p className="text-sm text-gray-500">1ª troca grátis</p>
                <p className="text-sm font-semibold text-gray-900">Em até 7 dias</p>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                <CreditCard className="size-5 text-gray-700" />
                <p className="text-sm text-gray-500">Desconto extra</p>
                <p className="text-sm font-semibold text-gray-900">No PIX</p>
              </div>

              <div className="flex flex-col items-center gap-2 bg-white px-4 py-5 text-center">
                <ShoppingCart className="size-5 text-gray-700" />
                <p className="text-sm text-gray-500">Parcele em até</p>
                <p className="text-sm font-semibold text-gray-900">3x sem juros</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <img className="size-5" src={assets.quality_icon} alt="" />
            <p>Produto 100% original com acabamento de qualidade.</p>
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