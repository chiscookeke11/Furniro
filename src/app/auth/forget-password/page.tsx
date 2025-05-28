"use client"


import { resetPassword } from "@/lib/SupabaseAuth";
import Input from "app/components/ui/Input";
import Loader from "app/components/ui/Loader";
import React, { useState } from "react";





export default function Page() {

const [inputValue, setInputValue] = useState("")
const [loading, setLoading] = useState(false)

const handleReset  = async (e: React.FormEvent <HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(inputValue);
    setLoading(false);
    setInputValue("");
}



    return (
        <div  className="w-full flex  items-center justify-center flex-col py-7 px-5  bg-[#FCF8F3] font-poppins" >
        <form onSubmit={handleReset}   className="w-full max-w-[635px] flex flex-col items-center bg-white gap-5 px-5 py-8 font-poppins " >
            <Input
            className=""
            errorMessage=""
            inputId="email"
            label="Enter recovery email"
            name="Email"
            onChange={(e) => setInputValue(e.target.value) }
            required={true}
            placeholder=""
            type="email"
            value={inputValue}
            />

            <button  className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400"   disabled={loading}  > {loading ? <Loader/> :  "Submit" } </button>
        </form>
        </div>
    )
}