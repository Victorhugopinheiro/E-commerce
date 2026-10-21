import { useContext, type ReactNode } from 'react'
import { ShoppingBag } from 'lucide-react'
import { ShopContext } from '../../context/ShopContext'

function CartTotal({ children }: { children?: ReactNode }) {

    const { currency, totalValue, fee } = useContext(ShopContext)!

    return (
        <div className='w-full rounded-lg bg-white shadow-md overflow-hidden'>

            <div className='flex items-center justify-center gap-2 bg-gray-100 py-5'>
                <ShoppingBag size={22} />
                <h2 className='text-lg font-bold'>Resumo do pedido</h2>
            </div>

            <div className='flex flex-col gap-4 p-6'>

                <div className='flex justify-between items-center'>
                    <p className='text-sm'>Subtotal</p>
                    <p className='text-lg'>{currency} {totalValue}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-sm'>Frete</p>
                    <p className='text-lg'>{currency} {fee}</p>
                </div>

                <hr className='border-gray-200' />

                <div className='flex justify-between items-center text-gray-700'>
                    <p className='text-xl font-bold'>Total</p>
                    <p className='text-xl font-bold text-green-700'>{currency} {(Number(totalValue) + Number(fee)).toFixed(2)}</p>
                </div>

                {children}

            </div>

        </div>
    )
}

export default CartTotal