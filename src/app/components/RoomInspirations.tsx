"use client "

import { useFurniroContext } from "context/FurniroContext"
import InspirationSlider from "./InspirationSlider"







export default function RoomInspirations() {


    const {tableData} = useFurniroContext()









    return (
        <section className="font-poppins  w-full bg-[#FCF8F3] px-10 py-10 flex-col flex lg:flex-row  items-center justify-center gap-6  min-h-[50vh] " >



            <div className="max-w-[422px] flex flex-col items-start justify-center text-start gap-5 ">
                <h1 className="text-[#3A3A3A] font-bold text-[40px] leading-[45px] "  >50+ Beautiful rooms
                    inspiration</h1>
                <p className="text-[#616161] text-base font-medium  "  >Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                <button className=" bg-[#B88E2F] h-12 py-3 px-5 text-[#FFFFFF] text-base font-semibold w-[176px] cursor-pointer "  >Explore more</button>
            </div>


<InspirationSlider Images={tableData.slice(0, 5)} />








        </section>
    )
}