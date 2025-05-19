

import ContactForm from "app/components/ContactForm";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import { Clock, MapPin, Phone } from "lucide-react";




export default function Page() {






    return (
        <div>
            <ReusableHero pageName="Contact"   />
            <section className="w-full  flex flex-col items-center justify-center py-[80px] font-poppins px-[14px] "  >



                <div className=" w-full max-w-[644px] text-center space-y-3  "  >
                <h1 className="text-[#000000] text-2xl md:text-4xl font-semibold " >Get In Touch With Us</h1>
                <p className="text-[#9F9F9F] text-sm md:text-base font-normal "  >For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>







<div className=" w-full flex flex-col md:flex-row items-start justify-center  my-10 md:my-[80px] gap-10 "  >

    <div className="w-full max-w-[393px] flex flex-col items-start md:items-center gap-5 " >


        <div className=" flex items-start  gap-3  " >
        <MapPin size={22} color="#000000" />
        <div className="w-full max-w-[300px] md:max-w-[212px] " >
            <h4 className="text-[#000000] text-xl md:text-2xl font-medium mt-0" >Address</h4>
            <p className="text-[#000000] text-sm md:text-base font-normal " >236 5th SE Avenue, New York NY10000, United States</p>
        </div>

        </div>

        <div className=" flex items-start gap-3  " >
        <Phone size={22} color="#000000" />
        <div className="w-full max-w-[300px] md:max-w-[212px] " >
            <h4 className="text-[#000000] text-xl md:text-2xl font-medium  mt-0" >Phone</h4>
            <p className="text-[#000000] text-sm md:text-base font-normal " >Mobile: +(84) 546-6789</p>
            <p className="text-[#000000] text-sm md:text-base font-normal " >Hotline: +(84) 456-6789</p>
        </div>

        </div>

        <div className=" flex items-start gap-3 " >
        <Clock size={22} color="#000000" />
        <div className="w-full max-w-[300px] md:max-w-[212px] " >
            <h4 className="text-[#000000] text-xl md:text-2xl font-medium mt-0" >Working Time</h4>
            <p className="text-[#000000] text-sm md:text-base font-normal " >Monday-Friday: 9:00 - 22:00 </p>
            <p className="text-[#000000] text-sm md:text-base font-normal " >Saturday-Sunday: 9:00 - 21:00</p>
        </div>

        </div>

    </div>

<ContactForm/>


</div>

            </section>


<ServiceHighlights/>
        </div>
    )
}