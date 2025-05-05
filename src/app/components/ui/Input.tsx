




interface InputProps {
    type: string,
    placeholder: string,
    value: string,
    label: string,
    inputId: string,
    name: string,
    errorMessage: string
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    required: boolean,
}


export default function Input({type, placeholder, value, label, inputId, name, errorMessage, onChange, required }: InputProps ) {
    return (
        <div className="w-full " >
            <label htmlFor={inputId} className=" w-full flex flex-col items-start gap-1 " >
                <span className="text-base font-medium text-[#000000] "  > {label} </span>
                <input onChange={onChange}  type={type} placeholder={placeholder} id={inputId} value={value} name={name} className="w-full outline-none  border-[1px] border-[#9F9F9F] h-[75px] rounded-[10px] px-3 py-2 text-[#000000] font-normal text-base " required={required} />
            </label>
            <p className="ml-auto text-red-500 text-sm font-medium w-fit mt-2  " > {errorMessage} </p>
        </div>
    )
}