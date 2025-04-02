"use client"

import { ProductCardData } from "data/Mockdata";
import ProductCard from "./ui/ProductCard";
import { useState } from "react";


export default function OurProducts() {

    const [sliceValue, setSlicevalue] = useState(8);

    const increaseSlice = () => {
        setSlicevalue((prevSliceValue) => prevSliceValue + 4);
    }



    return(
        <section className="font-poppins  w-full flex flex-col items-center justify-center gap-10  px-4 py-16  " >
       <h1 className=" font-bold text-[40px] text-[#3A3A3A] " > Our Products </h1>



       <div className="w-full  h-fit grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center"  >

{
    ProductCardData.slice(0, sliceValue).map((card, index) => (




        <ProductCard
        key={index}
furnitureName={card.furnitureName}
description={card.description}
image={card.image}
price={card.price}
newPrice={card.newPrice}
discount={card.isDiscounted}
/>
    ))
}

       </div>

       <button onClick={increaseSlice} className="font-poppins w-[245px] h-12 bg-white border-[1px] border-[#B88E2F] text-[#B88E2F] text-base font-semibold cursor-pointer  " >Show More</button>
        </section>
    )
}