

import { createContext, useState } from "react";
import { products as initialProducts } from "../assets/assets";

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

interface ShopContextType {
    currency: string;
     setCurrency: (currency: string) => void;

    fee: string;
    setFee: (fee: string) => void;

    products?: ProductProps[];

    latesteProducts?: ProductProps[];
    setLatestProducts: (currency: ProductProps[]) => void;

    bestSallers?: ProductProps[];
    setBestSallers?: (currency: ProductProps[]) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("R$");
    const products: ProductProps[] = initialProducts;
    const [latesteProducts, setLatestProducts] = useState<ProductProps[]>(products.slice(0, 10));
    const [bestSallers, setBestSallers] = useState<ProductProps[]>(products.filter(product => product.bestseller).slice(0, 5));

    console.log(products)

    return (
        <ShopContext.Provider value={{ 
            currency, setCurrency,
         fee, setFee, products, 
         latesteProducts, setLatestProducts,
         bestSallers, setBestSallers
         }}>
            {children}
        </ShopContext.Provider>
    );
};
