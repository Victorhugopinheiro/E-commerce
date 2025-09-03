import { useState } from "react"
import InputComponent from "../components/PlaceOrder/InputComponent"


function Login() {

  const [controlAuthetication, setControlAuthetication] = useState('signUp')

  return (
    <form className="flex flex-col items-center w-[90%] m-auto mt-30 md:max-w-96">

      <div className="inline-flex items-center mt-10 mb-2 gap-2">
        <p className="prata-regular text-3xl">{controlAuthetication === 'signUp' ? 'CADASTRAR' : 'ENTRAR'}</p>
        <hr className="border-nome h-[1.5px] w-8 bg-gray-800" />
      </div>



      {controlAuthetication === 'signUp' && (
        <InputComponent placeHolder="Name" />
      )}

      <InputComponent placeHolder="Email" />

      <InputComponent placeHolder="Password" />

      <div className="flex text-gray-800 w-full justify-between">
        <p className="cursor-pointer">Esqueceu sua senha?</p>
        {controlAuthetication === 'signUp' ?
          <p className="cursor-pointer" onClick={() => setControlAuthetication('signIn')}>Entrar</p>
          : <p className="cursor-pointer" onClick={() => setControlAuthetication('signUp')}>Cadastrar</p>
        }
      </div>

      <button className="mt-6 bg-black w-[200px] text-white py-2 rounded cursor-pointer">{controlAuthetication === 'signIn' ? 'Entrar' : 'Cadastrar'}</button>
    </form>
  )
}

export default Login