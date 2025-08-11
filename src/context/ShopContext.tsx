

import { createContext, useState } from "react";
import { products as initialProducts } from "../assets/assets";

interface ProductProps {
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
    fee: string;
    setFee: (fee: string) => void;
    setCurrency: (currency: string) => void;
    products?: ProductProps[];
    latesteProducts?: ProductProps[];
    setLatestProducts: (currency: ProductProps[]) => void;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("R$");
    const products: ProductProps[] = initialProducts;
    const [latesteProducts, setLatestProducts] = useState<ProductProps[]>(products.slice(0, 10));

    console.log(products)

    return (
        <ShopContext.Provider value={{ currency, setCurrency, fee, setFee, products, latesteProducts, setLatestProducts }}>
            {children}
        </ShopContext.Provider>
    );
};
