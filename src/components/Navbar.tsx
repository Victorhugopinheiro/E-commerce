import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [controlMenu, setControlMenu] = useState(false)
    const { setShowSearch, cart } = useContext(ShopContext)!;

    return (
        <div className='flex justify-between items-center py-5 font-medium'>
            <img className='w-36' src={assets.logo} alt='' />

            <ul className='hidden md:flex gap-3 text-sm text-gray-700'>
                <NavLink to={'/'} className='flex flex-col items-center gap-1'>
                    <p>HOME</p>

                    <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to={'/collection'} className=' flex flex-col items-center gap-1'>
                    <p>COLEÇÃO</p>

                    <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to={'/about'} className='flex flex-col items-center gap-1'>
                    <p>SOBRE</p>

                    <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>

                <NavLink to={'/contact'} className='flex flex-col items-center gap-1'>
                    <p>CONTATO</p>

                    <hr className='hidden w-2/4 border-none h-[1.5px] bg-gray-700' />
                </NavLink>
            </ul>

            <div className='flex gap-5 items-center'>

                <img onClick={() => setShowSearch!(true)} src={assets.search_icon} className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <img src={assets.profile_icon} className='w-5 cursor-pointer' />

                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400'>
                            <p className='cursor-pointer hover:text-black'>Meu Perfil</p>
                            <p className='cursor-pointer hover:text-black'>Pedidos</p>
                            <p className='cursor-pointer hover:text-black'>Sair</p>
                        </div>
                    </div>

                </div>


                <Link to={'/cart'} className='relative'>
                    <img className='w-5 min-w-5' src={assets.cart_icon} />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black
                     text-white rounded-full aspect-square text-[8px]'>{cart?.length}</p>
                </Link>

                <img onClick={() => setControlMenu(true)} className='w-5 md:hidden' src={assets.menu_icon} />
            </div>
            {controlMenu && (
                <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all  ${controlMenu ? 'w-full' : 'w-0'} `}>

                    <div className='flex flex-col text-gray-600'>

                        <div onClick={() => setControlMenu(false)} className='flex gap-6 items-center w-fit p-2 cursor-pointer hover:text-black'>
                            <img src={assets.dropdown_icon} className='h-4 rotate-180' />
                            <p >Voltar</p>
                        </div>

                        <NavLink onClick={() => setControlMenu(false)} to={'/'} className={'py-2 pl-6 border-b hover:text-black'}>HOME</NavLink>
                        <NavLink onClick={() => setControlMenu(false)} to={'/'} className={'py-2 pl-6 border-b hover:text-black'}>COLEÇÃO</NavLink>
                        <NavLink onClick={() => setControlMenu(false)} to={'/'} className={'py-2 pl-6 border-b hover:text-black'}>SOBRE</NavLink>
                        <NavLink onClick={() => setControlMenu(false)} to={'/'} className={'py-2 pl-6 border-b hover:text-black'}>CONTATO</NavLink>

                    </div>


                </div>
            )}

        </div>
    )
}

export default Navbar