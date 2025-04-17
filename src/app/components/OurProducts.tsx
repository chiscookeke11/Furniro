"use client"

import { useFurniroContext } from "context/FurniroContext";
import ProductCard from "./ui/ProductCard";
import Loader from "./ui/Loader";
import Link from "next/link";







export default function OurProducts() {


  const { error, loading, tableData } = useFurniroContext();











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
              tableData.slice(0, 8).map((card, index) => (
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