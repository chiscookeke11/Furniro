"use client "


import { useEffect, useState } from "react";
import InspirationSlider from "./InspirationSlider"
import { InspirationItem } from "interfaces/InspirationItem";
import { supabase } from "utils/supabaseClient";
import Loader from "./ui/Loader";







export default function RoomInspirations() {

    const [roomInspirationsData, setRoomInspirationData] = useState<InspirationItem[]>([])
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);




    useEffect(() => {
        const fetchRoomInspirationData = async () => {
            const { error, data } = await supabase.from('furniture').select('*').eq('category', 'bedroom');

            if (error) {
                console.error("Error fetching room inspirations:", error);
                setRoomInspirationData([]);
                setError(true);
            }
            else if (data) {
                setRoomInspirationData(data || []);
                setError(false)
            }
            setLoading(false)
        }
        fetchRoomInspirationData();
    }, []);













    return (
        <section className="font-poppins  w-full bg-[#FCF8F3] px-10 py-10 flex-col flex lg:flex-row  items-center justify-between gap-6  min-h-[50vh]  " >



            <div className="max-w-[422px] flex flex-col items-start justify-center text-start gap-5 ">
                <h1 className="text-[#3A3A3A] font-bold text-[40px] leading-[45px] "  >50+ Beautiful rooms
                    inspiration</h1>
                <p className="text-[#616161] text-base font-medium  "  >Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                <button className=" bg-[#B88E2F] h-12 py-3 px-5 text-[#FFFFFF] text-base font-semibold w-[176px] cursor-pointer "  >Explore more</button>
            </div>




       {error ?  (
          <p className="text-red-500 text-center ">Error Fetching Data</p>) : loading ? ( <Loader/> ): (<InspirationSlider Images={roomInspirationsData.slice(0, 4)} />)}








        </section>
    )
}