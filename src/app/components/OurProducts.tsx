"use client"

import { ProductCardData } from "data/Mockdata";
import ProductCard from "./ui/ProductCard";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";


export default function OurProducts() {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null >(null);

    const [sliceValue, setSlicevalue] = useState(8);

    const increaseSlice = () => {
        setSlicevalue((prevSliceValue) => prevSliceValue + 4);
    }



    useEffect(() => {
        const fetchFurnitureData = async () => {

            const {data, error} = await supabase
            .from('furniture')
            .select('*')


            if (error) {
                console.log('error fetching data:', error)
                setTableData(null)
                setLoading(false)
                setError(true)
            }

            if (data) {
                setTableData(data)
                setError(false)
                setLoading(false)
            }
        }


        fetchFurnitureData()
    }, [])


    // console.log(tableData.name)












    return(
        <section className="font-poppins  w-full flex flex-col items-center justify-center gap-10  px-4 py-16  " >







       <h1 className=" font-bold text-[40px] text-[#3A3A3A] " > Our Products </h1>



       <div className="w-full  h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center"  >
       {error ? (
  <p className="text-red-500">Error Fetching Data</p>
) : loading ? (
  <p className="text-gray-500 text-center">Loading furniture data...</p>
) : (
  tableData?.map((card, index) => (
    <ProductCard
      key={index}
      furnitureName={card.name}
      description={card.description}
      image={card.image_url}
      price={card.price}
      newPrice={card.new_price}
      loading={false} // or remove this prop if no longer needed
    />
  ))
)}


       </div>

       <button onClick={increaseSlice} className="font-poppins w-[245px] h-12 bg-white border-[1px] border-[#B88E2F] text-[#B88E2F] text-base font-semibold cursor-pointer  " >Show More</button>
        </section>
    )
}