
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import SendEmail from '../components/SendEmail'

function Contact() {
  return (
    <div className='flex flex-col items-center justify-center my-10'>

      <Tittle title1='Fale' title2='Conosco' />


      <div className='flex flex-col w-full md:flex-row items-center justify-center gap-10 mt-10 px-4'>
        <img className='w-full md:w-1/2 max-w-[600px] h-auto max-h-[600px]' src={assets.contact_img} alt="" />


        <div className='flex flex-col gap-4 max-w-lg '>
          <p className='font-semibold text-xl'>Nosso contato</p>
          <p className='text-gray-500'>Rua Atlantica, 305, Detroit</p>
          <p className='text-gray-500 '>Tel:(11) 97898-8989</p>
          <p className='text-gray-500 '>Email: forever@gmail.com</p>
          <p className='text-gray-600 font-semibold text-xl '>Carreiras Forever</p>
          <p className='text-gray-500 text-sm'>Saiba mais sobre nosso time e vagas abertas</p>


          <button className='bg-black text-white px-6 py-2 mt-4 hover:bg-gray-800 transition-colors'>Ver Vagas</button>
        </div>
      </div>


      <SendEmail/>
    </div>
  )
}

export default Contact