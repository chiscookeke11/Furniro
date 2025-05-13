"use client"

import { useState } from "react"
import { supabase } from "utils/supabaseClient";




export default function Page() {


    const [signUpFormValues, setSignUpFormValues] = useState(
        {
name: "",
email: "",
password: "",
        }
    )


    const handleChange = (e) => {
        const {name, value} = e.target;

setSignUpFormValues((prev) => ({
    ...prev,
    [name]: value
}) )
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.signUp({
            email: signUpFormValues.email,

            password: signUpFormValues.password,
            options: {
        data: {
            name: signUpFormValues.name
        }
    }
        })

        if (error) {
            console.log("error signing up", error);
            alert(error)
        }
        else {
            // console.log(data)
        }

    }




    return (
       <form action="" onSubmit={handleSignUp} className="flex flex-col gap-4 bg-gray-500 w-full items-center ">
        Sign up form
            <input type="text" name="name" placeholder="enter your name" value={signUpFormValues.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="enter your email" value={signUpFormValues.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="enter your pasword" value={signUpFormValues.password} onChange={handleChange}/>
            <button type="submit"  > Sign Up </button>
        </form>
    )
}