

import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import api from "../service/api";
import { AuthContext } from "./authContext";

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



    removeProduct?: (productId: string, size:string) => void;
    totalItems?: () => number;

    totalValue?: number;
    setTotalValue?: (total: number) => void;

    gettinProducts?: () => void;

}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

// ...existing code...

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
    const { token } = useContext(AuthContext)!;

    const [currency, setCurrency] = useState<string>("R$");
    const [fee, setFee] = useState<string>("10");
    const [products, setProducts] = useState<ProductProps[]>([]);

    const [latesteProducts, setLatestProducts] = useState<ProductProps[]>([]);
    const [bestSallers, setBestSallers] = useState<ProductProps[]>([]);

    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const [totalValue, setTotalValue] = useState<number>(0)
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async (item: CartItem) => {
        if (!item.size) {
            toast.error("Por favor, selecione um tamanho válido.");
            return
        }

        if (!token) {
            toast.error("Você precisa estar logado para adicionar ao carrinho.");
            return;
        }

        try {
            const response = await api.post('/api/cart/add', { 
                productId: item.productId, 
                quantity: item.quantity, 
                size: item.size 
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setCart(response.data.cart);
                toast.success("Produto adicionado ao carrinho!");
            }
        } catch (error: any) {
            console.error("Error adding to cart:", error);
            toast.error("Erro ao adicionar produto ao carrinho.");
        }
    }

    const removeProduct = async (productId: string, size: string) => {
        if (!token) return;

        try {
            const response = await api.delete('/api/cart/remove', {
                data: { productId, size },
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setCart(response.data.cart);
                toast.success("Produto removido do carrinho!")
            } else {
                toast.error("Erro ao remover produto do carrinho!")
            }
        } catch (error) {
            console.error("Error removing product:", error);
            toast.error("Erro ao remover produto.");
        }
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

    const gettinProducts = async () => {
        try {
            const response = await api.get('/api/products/list');
            
            if (response.data.success) {
                setProducts(response.data.products);
                setLatestProducts(response.data.products.slice(0, 10));
                setBestSallers(response.data.products.filter((product: ProductProps) => product.bestseller).slice(0, 5));
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    const getProductsCart = async () => {
        // Verificações mais rigorosas
        if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
            console.log("Token inválido para buscar carrinho:", token);
            return;
        }

        try {
            console.log("Buscando carrinho com token válido:", token.substring(0, 20) + "...");
            
            const response = await api.post('/api/cart/items', {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setCart(response.data.cart || []);
                console.log('Carrinho carregado com sucesso:', response.data.cart);
            }
        } catch (error: any) {
            console.error("Erro completo ao buscar carrinho:", {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers,
                token: token?.substring(0, 20) + "..."
            });
            
            if (error.response?.status === 401) {
                console.log("Token não autorizado para carrinho - verificar backend");
            }
        }
    };

    // Carrega produtos uma vez ao inicializar
    useEffect(() => {
        gettinProducts();
    }, []);

    // Aguarda token válido antes de buscar carrinho
    useEffect(() => {
        console.log("Token mudou:", token ? token.substring(0, 20) + "..." : "sem token");
        
        // Delay para garantir que o token foi completamente inicializado
        if (token && token !== 'undefined' && token !== 'null') {
            const timeoutId = setTimeout(() => {
                getProductsCart();
            }, 100); // Pequeno delay de 100ms
            
            return () => clearTimeout(timeoutId);
        }
    }, [token]);

    // Recalcula total quando cart ou products mudam
    useEffect(() => {
        if (cart.length > 0 && products.length > 0) {
            totalItems();
        }
    }, [cart, products]);

    return (
        <ShopContext.Provider value={{
            currency, setCurrency,
            fee, setFee, products,
            latesteProducts, setLatestProducts,
            bestSallers, setBestSallers,
            search, setSearch, setShowSearch, showSearch,
            cart, setCart, addToCart, removeProduct, totalItems, setTotalValue, totalValue,
            gettinProducts
        }}>
            {children}
        </ShopContext.Provider>
    );
};
// ...existing code...