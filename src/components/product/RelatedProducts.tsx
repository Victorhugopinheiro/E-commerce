
import { useContext, useEffect, useState } from 'react';
import Tittle from '../Tittle'
import { ShopContext, type ProductProps } from '../../context/ShopContext';
import ImgModel from '../ImgModel';

interface RelatedProductsProps {
  category?: string;
  subCategory?: string;
}

export default function RelatedProducts({ category, subCategory }: RelatedProductsProps) {

  const { products } = useContext(ShopContext)!
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

  const filteredProducts = () => {
    let copyProducts = [...products!];

    if (category) {
     copyProducts = copyProducts.filter(product => product.category === category).slice(0, 5);
     return  setRelatedProducts(copyProducts)

      
    } else if (subCategory) {
      copyProducts = copyProducts.filter(product => product.subCategory === subCategory).slice(0, 5)
      return setRelatedProducts(copyProducts)

      
    }

   

  }


  useEffect(() => {

    filteredProducts()


  }, [products, category, subCategory])


  return (
    <div>
      <Tittle title1='Produtos' title2='Relacionados' />


      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {relatedProducts.map((product) => (
          <ImgModel price={String(product.price)} title={product.name} url={product.image[0]} currency='R$'
          id={product._id} key={product._id} 
          />
        ))}
      </div>

    </div>
  )
}
