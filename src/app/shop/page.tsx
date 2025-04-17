"use client"


import Navbar from "app/components/Navbar";
import ReusableHero from "app/components/ReusableHero";
import StatsBar from "app/components/StatsBar";
import Loader from "app/components/ui/Loader";
import ProductCard from "app/components/ui/ProductCard";
import { useFurniroContext } from "context/FurniroContext";
import { useState } from 'react';




export default function Page() {

    const { tableData, error, loading,  } = useFurniroContext();
    const itemsPerPage = 16;
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayStart = startIndex + 1;
    const displayEnd = Math.min(endIndex, tableData.length)



    const handleNext = () => {

if (currentPage < totalPages)   {
        setCurrentPage((prev) => prev + 1)
    }
    }







    return (
        <div className="bg-white font-poppins" >
            <Navbar />
            <ReusableHero pageName={"Shop"} />
            <StatsBar
            totalFurniture = {tableData.length}
            displayStart={displayStart}
                displayEnd={displayEnd}
            />
            <section className="w-full h-fit  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center  px-20 py-18">


                {tableData.slice(startIndex, endIndex).map((card, index) => (
                    <ProductCard
                        key={index}
                        furnitureName={card.name}
                        description={card.description}
                        image={card.image_url}
                        price={card.price}
                        newPrice={card.new_price}
                    />
                ))}




            </section>


{/* pagination buttons  */}
            <div className="flex items-center justify-center gap-[38px] min-h-[30vh] " >
                {error? "Error loading data" : loading? <Loader/> :
                [...Array(totalPages)].map((_, index) => (
                    <button
                     key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className="cursor-pointer"
                      > {index + 1}</button>
                ))
                }
            {error? null : loading ? null :  <button onClick={handleNext} disabled={currentPage === totalPages} className="self-center" >Next</button>}
            </div>
        </div>
    )
}