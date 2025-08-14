import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Checkbox from "../components/collection/Checkbox";
import Tittle from "../components/Tittle";
import ImgModel from "../components/ImgModel";
import { ShopContext } from "../context/ShopContext";


export interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[]; // array de caminhos de imagem
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}

function Collection() {

  const { products } = useContext(ShopContext)!;

  const [showFilters, setShowFilters] = useState(true);
  const [filterProducts, setFilterProducts] = useState<ProductProps[]>([]);

  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortProducts, setSortProducts] = useState<string>("Relevant");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilters(true);
      }
    };
    window.addEventListener("resize", handleResize);

    // Garante que ao montar, o estado está correto
    if (window.innerWidth >= 768) {
      setShowFilters(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    setFilterProducts(products!)

  }, []);


  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(cat => cat !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const changeSubcategory = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(cat => cat !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const sortItems = () => {



    const showProducts = [...filterProducts];

    switch (sortProducts) {
      case "Low-high":
        showProducts.sort((a, b) => a.price - b.price);
        setFilterProducts([...showProducts]);
        break;

      case "High-low":
        showProducts.sort((a, b) => b.price - a.price);
        setFilterProducts([...showProducts]);
        break;

      default:
        setFilterProducts([...products!]);
        break;
    }
  }

  const gettingFilteredProducts = () => {
    if (category.length > 0) {
      const filtered = products!.filter(product => category.includes(product.category));
      setFilterProducts(filtered);
      return
    }

    if (subCategory.length > 0) {
      const filtered = products!.filter(product => subCategory.includes(product.subCategory))
      setFilterProducts(filtered);
      return
    }

    setFilterProducts(products!);
  }

  useEffect(() => {

    gettingFilteredProducts();

  }, [category, subCategory]);

  useEffect(() => {
    sortItems()
  }, [sortProducts])

  return (
    <div className="flex flex-col sm:flex-row gap-10">
      <div className="min-w-60 w-60 ">
        <p onClick={() => setShowFilters(!showFilters)} className='flex text-center gap-2 items-center w-fit transition md:hidden'>FILTERS
          <img className={`h-3  ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>


        <p
          className='hidden md:flex text-center gap-2 items-center w-fit transition '>
          FILTERS
        </p>



        <div className={`flex flex-col my-6 justify-center gap-2 border p-4 border-gray-300 ${showFilters ? "" : "hidden"}`}>
          <p className="mb-3 font-medium">CATEGORIES</p>

          <Checkbox onChange={changeCategory} title="HOMEM" value="Men" />
          <Checkbox onChange={changeCategory} title="MULHER" value="Women" />
          <Checkbox onChange={changeCategory} title="CRINAÇA" value="Kids" />

        </div>

        <div className={`flex flex-col my-6 justify-center gap-2 border p-4  border-gray-300 ${showFilters ? "" : "hidden"}`}>
          <p className="mb-3 font-medium">TIPO</p>

          <Checkbox onChange={changeSubcategory} title="CAMISETAS" value="Topwear" />
          <Checkbox onChange={changeSubcategory} title="AGASALHOS" value="Winterwear" />
          <Checkbox onChange={changeSubcategory} title="BERMUDAS" value="Bottomwear" />
        </div>

      </div>


      <div className="flex-1">

        <div className="flex justify-between items-center mb-6">
          <Tittle title1="MELHORES" title2="COLEÇOES" />


          <select onChange={(e) => setSortProducts(e.target.value)} className="border border-gray-300 rounded-md p-2 text-gray-700">
            <option value="Relevant">Relevantes</option>
            <option value="Low-high">Preço: Baixo a Alto</option>
            <option value="High-low">Preço: Alto a Baixo</option>

          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

          {filterProducts.map((product) => (
            <ImgModel
              key={product._id}
              url={product.image[0]}
              title={product.name}
              price={product.price.toFixed(2)}
              currency="R$"
            />
          ))}

        </div>

      </div>



    </div>
  )
}

export default Collection