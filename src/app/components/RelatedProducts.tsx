

"use client"


import { Furniture } from "interfaces/FurnitureInterface"
import { useEffect, useState } from "react"
import { supabase } from "utils/supabaseClient"
import ProductCard from "./ui/ProductCard";
import Loader from "./ui/Loader";
import { useRouter } from "next/navigation";
import { useFurniroContext } from "context/FurniroContext";





interface RelatedProductsProps {
    category: string,
}

export default function RelatedProducts ({category}: RelatedProductsProps ) {

    const [relatedItems, setRelatedItems] = useState<Furniture[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();
    const {setOptionValue} = useFurniroContext();


    useEffect(() => {


        const fecthRelatedProducts = async () => {
            const {data, error} = await supabase.from('furniture').select('*').eq('category', category);

            if (error) {
                console.error('Error fetching data:', error);
                setRelatedItems([]);
                setError(true);
            }
            else if (data) {
                setRelatedItems(data);
                setError(false);
              }
              setLoading(false);
        }

        fecthRelatedProducts();
    }, [category])




    const showMore = () => {
        router.push("/shop");
        setOptionValue(category)
    }






    return (

        <section className="wfull flex items-center justify-center h-fit  p-[5%] min-h-[30vh] border-t-[1px] border-b-[1px] border-[#D9D9D9] flex-col gap-16 ">

            <h1 className="text-[#000000] font-medium text-4xl  " > Related Products </h1>

        <section className={`w-full h-full     ${loading? "flex item-centers justify-center" : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center" } `} >




{loading ? (<Loader/>) : error ?  <p className="text-red-500 text-center ">Error Fetching Data</p> :  (
    relatedItems.slice(0, 4).map((item, index) => (
        <ProductCard
        key={index}
     furnitureName={item.name}
                       description={item.description}
                       image={item.image_url}
                       price={item.price}
                       newPrice={item.new_price}
                       id={item.id}
                       category={item.category}
        />
     ))
)}


        </section>


    {loading ? null : error ? null : <button onClick={showMore}  className=" bg-[#B88E2F] h-12 py-3 px-5 text-[#FFFFFF] text-base font-semibold w-[176px] cursor-pointer " >Show More </button>}

        </section>
    )
}