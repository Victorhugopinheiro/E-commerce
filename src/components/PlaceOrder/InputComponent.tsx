


interface InputProps {
   
    placeHolder: string

}


function InputComponent({ placeHolder }: InputProps) {
    return (
        <input className="w-full my-1 border rounded border-gray-200 px-3 py-2 text-gray-600" placeholder={placeHolder}>
           
        </input>
    )
}

export default InputComponent