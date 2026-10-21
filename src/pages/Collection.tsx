import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Checkbox from "../components/collection/Checkbox";
import Tittle from "../components/Tittle";
import ImgModel from "../components/ImgModel";
import { ShopContext } from "../context/ShopContext";
import api from "../service/api";
import { toast } from "react-toastify";


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

  const { showSearch, search } = useContext(ShopContext)!;

  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(true);
  const [backendProducts, setBackendProducts] = useState<ProductProps[]>([]);
  const [filterProducts, setFilterProducts] = useState<ProductProps[]>([]);
  const [sortProducts, setSortProducts] = useState<string>("Relevant");

  // Category/subCategory filters are the URL's source of truth, so navbar links and
  // manual checkbox toggles both end up driving the same backend-filtered fetch.
  const category = useMemo(
    () => searchParams.get("category")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );
  const subCategory = useMemo(
    () => searchParams.get("subCategory")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  );

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

  const toggleParamValue = (key: "category" | "subCategory", value: string) => {
    const current = searchParams.get(key)?.split(",").filter(Boolean) ?? [];

   

    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    const nextParams = new URLSearchParams(searchParams);
    if (next.length > 0) {
      nextParams.set(key, next.join(","));
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  };

  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleParamValue("category", e.target.value);
  };

  const changeSubcategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleParamValue("subCategory", e.target.value);
  };

  // Fetches already-filtered products from the backend whenever the category/subCategory
  // filters change (whether triggered by the navbar or by the checkboxes).
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await api.get("/api/products/list", {
          params: {
            category: category.length > 0 ? category.join(",") : undefined,
            subCategory: subCategory.length > 0 ? subCategory.join(",") : undefined,
          },
        });

        if (response.data.success) {
          console.log(response.data.products);
          setBackendProducts(response.data.products);
        }
      } catch {
        toast.error("Erro ao carregar produtos.");
      }
    };

    fetchFilteredProducts();
  }, [category, subCategory]);

  // Applies the (client-side) search term and sort order on top of the backend-filtered list.
  useEffect(() => {
    let result = [...backendProducts];

    if (search && showSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortProducts) {
      case "Low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "High-low":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    setFilterProducts(result);
  }, [backendProducts, search, showSearch, sortProducts]);

  return (
    <div className="flex flex-col container mx-auto sm:flex-row gap-10">
      <div className="min-w-60 w-60 ">
        <p onClick={() => setShowFilters(!showFilters)} className='flex text-center gap-2 items-center w-fit transition md:hidden'>FILTERS
          <img className={`h-3  ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>


        <p
          className='hidden md:flex text-center gap-2 items-center w-fit transition '>
          FILTERS
        </p>



        <div className={`flex flex-col my-2 justify-center gap-2 border p-4 border-gray-300 ${showFilters ? "" : "hidden"}`}>
          <p className="mb-1 font-medium">CATEGORIAS</p>

          <Checkbox onChange={changeCategory} checked={category.includes("Men")} title="HOMEM" value="Men" />
          <Checkbox onChange={changeCategory} checked={category.includes("Women")} title="MULHER" value="Women" />
          <Checkbox onChange={changeCategory} checked={category.includes("Kids")} title="CRIANÇA" value="Kids" />

        </div>

        <div className={`flex flex-col my-2 justify-center gap-2 border p-4  border-gray-300 ${showFilters ? "" : "hidden"}`}>
          <p className="mb-1 font-medium">TIPO</p>

          <Checkbox onChange={changeSubcategory} checked={subCategory.includes("Topwear")} title="CAMISETAS" value="Topwear" />
          <Checkbox onChange={changeSubcategory} checked={subCategory.includes("Winterwear")} title="AGASALHOS" value="Winterwear" />
          <Checkbox onChange={changeSubcategory} checked={subCategory.includes("Bottomwear")} title="BERMUDAS" value="Bottomwear" />
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
              id={product._id}
            />
          ))}

        </div>


        {filterProducts.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-3xl">Nenhum produto encontrado...</p>
          </div>
        )}

      </div>



    </div>
  )
}

export default Collection