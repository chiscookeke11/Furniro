"use client"


import { useRef, useState } from "react";
import Input from "./ui/Input";
import emailjs from "@emailjs/browser";





export default function ContactForm() {
    const service_id = "service_hprwj2l";
    const templateID = "template_oa5jnia";
    const publicKey = "-AXyifNYWMRF-f1jt";
    const [sending, setSending] = useState(false)


    const form = useRef(null);



    const [messageFormValues, setMessageFormValues] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMessageFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
        setSending(true)
        event.preventDefault();
        emailjs.sendForm(service_id, templateID, form.current!, publicKey).then(
            () => {
                setSending(false);
                setMessageFormValues({
                    fullName: "",
                    email: "",
                    subject: "",
                    message: "",
                })
            },
            (error) => {
                console.error(error);
                setSending(false)
            }
        )
    }





    return (

        <form ref={form} action="" onSubmit={sendEmail} className=" w-full max-w-[635px] flex flex-col items-start gap-5   p-1 " >

            <div className="w-full" >
                <Input onChange={handleChange} type="text" placeholder="Abc" name="fullName" inputId="fullName" label="Your name" value={messageFormValues.fullName} errorMessage="Error" required={true} />
            </div>


            <div className="w-full" >
                <Input onChange={handleChange} type="email" placeholder="Abc@def.com" name="email" inputId="email" label="Email address" value={messageFormValues.email} errorMessage="Error" required={true} />
            </div>


            <div className="w-full" >
                <Input onChange={handleChange} type="text" placeholder="This is an optional" name="subject" inputId="subject" label="Subject" value={messageFormValues.subject} errorMessage="Error" required={false} />
            </div>


            <div className="w-full" >
                <Input onChange={handleChange} type="text" placeholder="Hi! i’d like to ask about" name="message" inputId="message" label="Message" value={messageFormValues.message} errorMessage="Error" required={true} />
            </div>






            <button type="submit" className=" bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-[#FFFFFF] text-base font-normal " > {sending ? "Sending ..." : "Submit"} </button>











        </form>
    )
}