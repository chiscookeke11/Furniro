"use client"


import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import { supabase } from "utils/supabaseClient";




export default function Page() {

const [user, setUser] = useState<User | null>(null)
const router = useRouter();

        const [signInFormValues, setSignInFormValues] = useState(
            {
    email: "",
    password: "",
            }
        )




            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const {name, value} = e.target;

        setSignInFormValues((prev) => ({
            ...prev,
            [name]: value
        }) )
            }


            const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const {data, error} = await supabase.auth.signInWithPassword({
                    email: signInFormValues.email,
                    password: signInFormValues.password,
                })
                if (error) {
                    console.log(error);
                    alert(error)
                }
                else {
                    console.log(data)
                    setSignInFormValues({
                            email: "",
    password: "",
                    })
                    alert("sign in successful");
                                router.push("/")
                }
            }


            useEffect(() => {

                const {data: authListener} = supabase.auth.onAuthStateChange(
                    (event, session) => {
                        console.log("auth change:", event, session);

                        if (session) {
                            setUser(session.user);


                        }
                        else {
                            setUser(null)
                        }
                    }
                )

  return () => {
    authListener.subscription.unsubscribe();
  };
            }, [])


            console.log("the logged in user", user)


    return (
        <form action="" onSubmit={handleLogin} className="flex flex-col gap-4 bg-amber-300 w-full items-center">
            Sign in form
           <input type="email" name="email" placeholder="enter your email" value={signInFormValues.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="enter your pasword" value={signInFormValues.password} onChange={handleChange}/>
            <button type="submit"  > Sign In </button>
        </form>
    )
}