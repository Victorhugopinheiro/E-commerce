
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import SendEmail from '../components/SendEmail'

function About() {
  return (
    <div className='flex flex-col justify-center items-center my-2'>

      <Tittle title1='Sobre' title2='Nós' />

      <div className='flex flex-col md:flex-row my-8 px-4'>

        <img className='w-full md:w-1/2 h-64 md:h-auto max-h-[600px] object-cover'
          src={assets.about_img} alt="About Us" />

        <div className='flex  items-center flex-col md:ml-10 mt-6 md:mt-0'>
          <p className="text-gray-600 max-w-12/12  mx-auto my-8">Na Forever, acreditamos
            que cada peça conta uma história. Nascemos do desejo
            de criar produtos que não são apenas belos, mas que também carregam significado e duram
            para sempre, assim como o nosso nome sugere. Nossa paixão é oferecer a você itens que celebram a vida,
            a beleza e os momentos que importam.
            Cada produto é feito com carinho,
            pensando em quem vai usá-lo e nas memórias que ele vai criar.
          </p>

          <p className="text-gray-600 max-w-12/12 mx-auto my-8">
            Forever foi criada com uma missão: oferecer produtos que são atemporais, feitos para durar. Nosso nome reflete nossa paixão por itens de alta qualidade que você pode amar e usar por muito tempo.
          </p>

          <b>Nossa Missão</b>


          <p className="text-gray-600 max-w-12/12 mx-auto my-2">
            Resuma esse texto


            A Forever tem como missão criar produtos que celebram momentos
            e memórias duradouras. A marca se dedica a vender itens de alta
            qualidade que contam histórias e fazem parte da vida das pessoas,
            valorizando o que é atemporal. O objetivo é oferecer uma experiência que
            fortaleça laços e celebre a beleza e as conexões eternas.
          </p>

        </div>



      </div>



      <Tittle title1='PORQUE NOS' title2='ESCOLHER?' />


      <div className='flex flex-col md:flex-row my-8 px-4'>
        <div className='flex justify-center mx-auto border border-gray-400 w-full md:max-w-[450px] py-20  items-center flex-col md:mr-10 mt-6 md:mt-0'>
          <p className='font-bold'>Qualidade do Produto </p>

          <p className="text-gray-600 max-w-10/12 mx-auto my-2">
            Qualidade do Produto
            Na Forever, a qualidade não é apenas um detalhe, é a nossa essência. Cada item é criado com os
            melhores materiais e uma atenção minuciosa aos detalhes,
            garantindo que você receba um produto que não só encanta, mas que também resiste ao tempo.
          </p>
        </div>

        <div className='flex justify-center mx-auto border border-gray-400 w-full md:max-w-[450px] py-20  items-center flex-col md:mr-10 mt-6 md:mt-0'>
          <p className='font-bold'> Qualidade do Atendimento</p>

          <p className="text-gray-600 max-w-10/12 mx-auto my-2">

            Nosso compromisso com você vai além do produto. Nosso atendimento é feito de
            pessoa para pessoa, com empatia e dedicação. Estamos aqui para garantir que sua
            experiência na Forever seja tão especial e duradoura quanto nossos produtos.
          </p>
        </div>


        <div className='flex justify-center mx-auto border border-gray-400 w-full md:max-w-[450px] py-20  items-center flex-col md:mr-10 mt-6 md:mt-0'>
          <p className='font-bold'>Qualidade da Garantia
          </p>

          <p className="text-gray-600 max-w-10/12 mx-auto my-2">
            Acreditamos na durabilidade dos nossos produtos, e por isso, oferecemos uma garantia que reflete essa
            confiança. A sua satisfação é a nossa prioridade,
            e nosso compromisso é assegurar que você se sinta seguro e valorizado em sua jornada com a Forever.
          </p>
        </div>
      </div>



        <SendEmail/>

    </div>
  )
}

export default About