"use client"
import ProductCard from "./ui/ProductCard";
import Loader from "./ui/Loader";
import Link from "next/link";
import { Furniture } from '../../interfaces/FurnitureInterface';
import { useState, useEffect } from "react";
import { supabase } from "utils/supabaseClient";







export default function OurProducts() {


  const [heroTableData, setHeroTableData] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);



     useEffect(() => {
        const fetchFurnitureData = async () => {


          const { data, error } = await supabase.from('furniture').select('*');

          if (error) {
            console.error('Error fetching data:', error);
            setHeroTableData([]);
            setError(true);
          } else if (data) {
            setHeroTableData(data);
            setError(false);
          }

          setLoading(false);
        };

        fetchFurnitureData();
      }, []);




















  return (
    <section className="font-poppins  w-full flex flex-col items-center justify-center gap-10  px-4 py-16  " >







      <h1 className=" font-bold text-[40px] text-[#3A3A3A] " > Our Products </h1>



      <div className="w-full  h-fit"  >
        {error ? (
          <p className="text-red-500 text-center ">Error Fetching Data</p>
        ) : loading ? (
          <Loader/>
        ) :

          <div className="w-full h-fit  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center" >
            {
              heroTableData.slice(0, 8).map((card, index) => (
                <ProductCard
                  key={index}
                  furnitureName={card.name}
                  description={card.description}
                  image={card.image_url}
                  price={card.price}
                  newPrice={card.new_price}
                />
              ))
            }

          </div>
        }


      </div>


<Link href={"/shop"} >
      <button
        className="font-poppins w-[245px] h-12 bg-white border-[1px] border-[#B88E2F] text-[#B88E2F] text-base font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50  " >
        Show More
      </button>
      </Link>
    </section>
  )
}