"use client"

import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import Input from "app/components/ui/Input";
import { Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";



export default function Page() {


    const [messageFormValues, setMessageFormValues] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
       setMessageFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
       }))
    }



    return (
        <div>
            <ReusableHero pageName="Contact"   />
            <section className="w-full  flex flex-col items-center justify-center py-[80px] font-poppins "  >



                <div className=" w-full max-w-[644px] text-center space-y-3  "  >
                <h1 className="text-[#000000] text-4xl font-semibold " >Get In Touch With Us</h1>
                <p className="text-[#9F9F9F] text-base font-normal "  >For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>







<div className=" w-full flex items-start justify-center  my-[80px] "  >

    <div className="w-full max-w-[393px] flex flex-col items-center gap-5 " >


        <div className=" flex items-start gap-3 " >
        <MapPin size={22} color="#000000" />
        <div className="w-full max-w-[212px] " >
            <h4 className="text-[#000000] text-2xl font-medium mt-0" >Address</h4>
            <p className="text-[#000000] text-base font-normal " >236 5th SE Avenue, New York NY10000, United States</p>
        </div>

        </div>

        <div className=" flex items-start gap-3 " >
        <Phone size={22} color="#000000" />
        <div className="w-full max-w-[212px] " >
            <h4 className="text-[#000000] text-2xl font-medium  mt-0" >Phone</h4>
            <p className="text-[#000000] text-base font-normal " >Mobile: +(84) 546-6789</p>
            <p className="text-[#000000] text-base font-normal " >Hotline: +(84) 456-6789</p>
        </div>

        </div>

        <div className=" flex items-start gap-3 " >
        <Clock size={22} color="#000000" />
        <div className="w-full max-w-[212px] " >
            <h4 className="text-[#000000] text-2xl font-medium mt-0" >Working Time</h4>
            <p className="text-[#000000] text-base font-normal " >Monday-Friday: 9:00 - 22:00 </p>
            <p className="text-[#000000] text-base font-normal " >Saturday-Sunday: 9:00 - 21:00</p>
        </div>

        </div>

    </div>



<form action="" className=" w-full max-w-[635px] flex flex-col items-start gap-5   p-1 " >

<div className="w-full" >
<Input onChange={handleChange} type="text" placeholder="Abc" name="fullName" inputId="fullName" label="Your name" value={messageFormValues.fullName} errorMessage="Error" required={true}  />
</div>


<div className="w-full" >
<Input onChange={handleChange} type="email" placeholder="Abc@def.com" name="email" inputId="email" label="Email address"  value={messageFormValues.email}  errorMessage="Error" required={true}   />
</div>


<div className="w-full" >
<Input onChange={handleChange} type="text" placeholder="This is an optional" name="subject" inputId="subject" label="Subject" value={messageFormValues.subject}   errorMessage="Error" required={false}  />
</div>


<div className="w-full" >
<Input onChange={handleChange} type="text" placeholder="Hi! i’d like to ask about" name="message" inputId="message" label="Message"  value={messageFormValues.message}  errorMessage="Error" required={true}  />
</div>






 <button type="button" className=" bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-[#FFFFFF] text-base font-normal " >Submit</button>











</form>
</div>

            </section>


<ServiceHighlights/>
        </div>
    )
}