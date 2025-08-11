import { assets } from "../assets/assets"




function Hero() {
    return (
        <div className='flex flex-col md:flex-row  border-gray-400 border'>


            <div className='w-full md:w-1/2 flex items-center justify-center '>

                <div className="text-[#414141]">
                    <div className='flex gap-2 items-center'>

                        <p className='w-8 h-[2px] md:w-10 font-bold bg-[#414141]'></p>
                        <p className="font-medium text-sm md:text-base">Melhores preços</p>

                    </div>

                    <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Recem chegados</h1>

                    <div className="flex items-center gap-2">
                        <p className="font-medium text-sm md:text-base">Compre Agora</p>
                        <p className='w-8 h-[1px] md:w-10 font-bold bg-[#414141]'></p>
                    </div>
                </div>


            </div>


            <img className="w-full pt-3 md:w-1/2" src={assets.hero_img} />


        </div>
    )
}

export default Hero