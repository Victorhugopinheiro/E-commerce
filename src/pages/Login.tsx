import { useContext, useState } from "react"
import InputComponent from "../components/PlaceOrder/InputComponent"
import { AuthContext } from "../context/authContext"


function Login() {

  const { signIn, signUp } = useContext(AuthContext)

  const [controlAuthetication, setControlAuthetication] = useState('signIn')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUpp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()


    signUp(username, email, password,)
  }

  const signInn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    signIn(email, password)
  }

  return (
    <form className="flex flex-col items-center w-[90%] m-auto mt-30 md:max-w-96">

      <div className="inline-flex items-center mt-10 mb-2 gap-2">
        <p className="prata-regular text-3xl">{controlAuthetication === 'signUp' ? 'CADASTRAR' : 'ENTRAR'}</p>
        <hr className="border-nome h-[1.5px] w-8 bg-gray-800" />
      </div>



      {controlAuthetication === 'signUp' && (
        <InputComponent value={username} onChange={setUsername} placeHolder="Nome" />
      )}

      <InputComponent value={email} onChange={setEmail} placeHolder="Email" />

      <InputComponent value={password} onChange={setPassword} placeHolder="Password" />

      <div className="flex text-gray-800 w-full justify-between">
        <p className="cursor-pointer">Esqueceu sua senha?</p>
        {controlAuthetication === 'signUp' ?
          <p className="cursor-pointer" onClick={() => setControlAuthetication('signIn')}>Entrar</p>
          : <p className="cursor-pointer" onClick={() => setControlAuthetication('signUp')}>Cadastrar</p>
        }
      </div>

      {controlAuthetication === 'signUp' ? (
        <button onClick={(e) => signUpp(e)} className="mt-6 bg-black w-[200px] text-white py-2 rounded cursor-pointer">
          Cadastrar</button>
      ) : <button onClick={(e) => signInn(e)} className="mt-6 bg-black w-[200px] text-white py-2 rounded cursor-pointer">
        Entrar</button>}
    </form>
  )
}

export default Login