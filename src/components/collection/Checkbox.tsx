

interface CheckboxProps {
    title: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export default function Checkbox({ title, value, onChange }: CheckboxProps) {
    return (
        <div className="flex items-center gap-2">
            <input onChange={onChange} value={value} type="checkbox" className="" id="exampleCheck1" />
            <p>{title}</p>
        </div>
    )
}
