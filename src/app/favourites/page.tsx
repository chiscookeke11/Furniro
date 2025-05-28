"use client"



import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import { CartItem } from "interfaces/CartItemInterface";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";




export default function Page() {
    const [favourites, setFavourites] = useState<CartItem[]>([])

    useEffect(() => {
        const fetchFavourites = async () => {

             const { data: { session }, error: sessionError } = await supabase.auth.getSession();
              if (sessionError) {
    console.log("Error fetching session:", sessionError.message);
    return;
  }

  if (!session) {
    console.log("No active session found");
    return;
  }
const userId = session?.user.id;


            const {data, error} = await supabase.from("favourites").select("*").eq("id", userId);


            if (error) {
                console.log("error fetching favourite", error)
            }
            else{
                console.log("the output", data)
                setFavourites(data)
            }
        }
        fetchFavourites()
    }, [])




    return (
        <div>
<ReusableHero pageName="Favourites" />

<div className="w-full h-fit  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">

<div> {favourites.map((item, index) => (
    <div key={index}>

    </div>
))} </div>


</div>



<ServiceHighlights/>
        </div>
    )
}