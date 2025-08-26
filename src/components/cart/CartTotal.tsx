import { useContext } from 'react'
import Tittle from '../Tittle'
import { ShopContext } from '../../context/ShopContext'

function CartTotal() {

    const {currency, totalValue, fee} = useContext(ShopContext)!
    
    return (
        <div>
            <Tittle title1='TOTAL DO' title2='CARRINHO' />

            <div className='flex flex-col gap-2'>

                <div className='flex justify-between'>

                    <p>Subtotal</p>
                    <p>{currency}{totalValue},00</p>
                    
                </div>
                <hr  className='text-gray-400'/>

                
                <div className='flex justify-between'>

                    <p>Frete</p>
                    <p>{currency}{fee},00</p>
                    
                </div>
                <hr className='text-gray-400'/>

                
                <div className='flex justify-between'>

                    <p className='font-bold'>Total</p>
                    <p className='font-bold'>{currency}{(Number(totalValue) + Number(fee))},00</p>
                    
                </div>
                


            </div>

        </div>
    )
}

export default CartTotal