


interface InputProps {

    placeHolder: string
    onChange: (value: string) => void;
    value?: string;
   

}


function InputComponent({ placeHolder, onChange, value }: InputProps) {
    return (
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full my-2 border rounded border-gray-200 px-3 py-2 text-gray-600" placeholder={placeHolder}>

        </input>
    )
}

export default InputComponent