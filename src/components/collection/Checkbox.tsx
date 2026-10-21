

interface CheckboxProps {
    title: string;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export default function Checkbox({ title, value, checked, onChange }: CheckboxProps) {
    return (
        <div className="flex items-center gap-2">
            <input checked={checked} onChange={onChange} value={value} type="checkbox" className="accent-green-700" id="exampleCheck1" />
            <p>{title}</p>
        </div>
    )
}
