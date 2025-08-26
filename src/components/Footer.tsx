
import { assets } from '../assets/assets'

function Footer() {
    return (
        <div className='mt-20 py-6'>
            <div className='flex flex-col items-center  md:grid md:grid-cols-3 gap-10 p-10 '>

                <div className='flex flex-col items-center gap-4 md:items-start'>
                    <img className='w-36 md:mb-1' src={assets.logo} alt='Logo' />
                    <p className='text-sm text-gray-800 w-2/3 font-medium'>Produto com qualidade forever</p>
                </div>


                <div>
                    <h3 className='font-medium mb-1 text-2xl'>Links Úteis</h3>
                    <ul className='text-sm text-gray-800 flex flex-col gap-1 md:gap-2'>
                        <li className='cursor-pointer hover:text-black w-fit'>Home</li>
                        <li className='cursor-pointer hover:text-black w-fit'>Coleção</li>
                        <li className='cursor-pointer hover:text-black w-fit'>Sobre</li>
                        <li className='cursor-pointer hover:text-black w-fit'>Contato</li>
                    </ul>
                </div>

                <div>
                    <h3 className='font-medium mb-1 text-2xl'>CONTATO</h3>
                    <ul className='text-sm text-gray-800 flex flex-col gap-2'>
                        <li className='cursor-pointer hover:text-black'>Email: contact@gmail.com</li>
                        <li className='cursor-pointer hover:text-black'>Telefone: +55 1198765-8910</li>
                    </ul>

                </div>

            </div>

            <hr className='border-gray-300 p-2' />

            <p className='text-center'>Todos os direitos reservados @FOREVER</p>
        </div>
    )
}

export default Footer