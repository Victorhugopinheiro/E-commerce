

import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../assets/assets";
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

export interface CartItem {
    productId: string;      // id do produto
    size: string;           // tamanho selecionado
    quantity: number;       // quantidade do produto
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

    search?: string;
    setSearch?: (search: string) => void;

    showSearch?: boolean;
    setShowSearch?: (show: boolean) => void;

    cart?: CartItem[];
    setCart?: (cart: CartItem[]) => void;

    addToCart?: (item: CartItem) => void;



    removeProduct?: (productId: string) => void;
    totalItems?: () => number;

    totalValue?: number;
    setTotalValue?: (total: number) => void;

}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("10");
    const products: ProductProps[] = initialProducts;
    const [latesteProducts, setLatestProducts] = useState<ProductProps[]>(products.slice(0, 10));
    const [bestSallers, setBestSallers] = useState<ProductProps[]>(products.filter(product => product.bestseller).slice(0, 5));

    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const [totalValue, setTotalValue] = useState<number>(0)
    console.log(products)

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {

        if (!item.size) {
            toast.error("Por favor, selecione um tamanho válido.");
            return
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.productId === item.productId && cartItem.size === item.size);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.productId === item.productId && cartItem.size === item.size
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prevCart, item];
        });
    }




    const removeProduct = (productId: string) => {
        setCart(prevCart => {
            const exist = prevCart.find(item => item.productId === productId)

            if (exist) {
                if (exist.quantity === 1) {
                    return prevCart.filter(item => item.productId !== productId)
                } else {
                    return prevCart.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                }
            }

            return prevCart;
        }
        );
    }

    const totalItems = () => {
        let total = 0;
        cart?.forEach((item: CartItem) => {
            const product = products?.find(product => product._id === item.productId);
            if (product) {
                total += product.price * item.quantity;
            }
        });
        setTotalValue(total);
        return total;
    }

    useEffect(() => {
        console.log("Cart updated:", cart);

    }, [cart])

    return (
        <ShopContext.Provider value={{
            currency, setCurrency,
            fee, setFee, products,
            latesteProducts, setLatestProducts,
            bestSallers, setBestSallers,
            search, setSearch, setShowSearch, showSearch,

            cart, setCart, addToCart, removeProduct, totalItems, setTotalValue, totalValue

        }}>
            {children}
        </ShopContext.Provider>
    );
};
