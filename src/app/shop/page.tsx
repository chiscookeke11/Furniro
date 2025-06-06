"use client"



import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import StatsBar from "app/components/StatsBar";
import Loader from "app/components/ui/Loader";
import ProductCard from "app/components/ui/ProductCard";
import { useFurniroContext } from "context/FurniroContext";
import { useEffect, useState } from 'react';




export default function Page() {
    const [grid, setGrid] = useState<boolean>(true);
    const { tableData, error, loading, } = useFurniroContext();
    const  [itemsPerPage, setItemsPerPage] = useState(16)
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayStart = startIndex + 1;
    const displayEnd = Math.min(endIndex, tableData.length)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };



    const handleNext = () => {

        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        scrollToTop();
    }, [currentPage])







    return (
        <div className="bg-white font-poppins" >
            <ReusableHero pageName={"Shop"} />
            <StatsBar
                totalFurniture={tableData.length}
                displayStart={displayStart}
                displayEnd={displayEnd}
                setGrid={setGrid}
                grid={grid}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
            <section className={`w-full h-fit   px-4 py-18 ${grid ? "grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 place-items-center " : "flex flex-col gap-4 items-center justify-center "} `}>


              {
                tableData?.length  < 1 && !error && !loading ?  "not available" :
                ( tableData.slice(startIndex, endIndex).map((card, index) => (
                    <ProductCard
                        key={index}
                        furnitureName={card.name}
                        description={card.description}
                        image={card.image_url}
                        price={card.price}
                        newPrice={card.new_price}
                        id={card.id}
                        category={card.category}
                    />
                )))
              }


            </section>


            {/* pagination buttons  */}
            <div className="flex items-center justify-center gap-[38px] min-h-[25vh] " >
                {error ? "Error loading data" : loading ? <Loader /> :
                    [...Array(totalPages)]
                        .map((_, index) => index + 1)
                        .filter((page) => {
                            const pagesRemaining = totalPages - currentPage + 1;
                            if (pagesRemaining >= 3) {
                                return page >= currentPage && page < currentPage + 3;
                            }
                            else {
                                return page > totalPages - 3;
                            }
                        })
                        .map((page) => (
                            <button key={page} onClick={() => setCurrentPage(page)}
                                className={`cursor-pointer w-[30px] h-[30px] md:w-[60px] md:h-[60px] rounded-[10px] text-base md:text-lg font-normal px-5 py-4 flex items-center justify-center ${currentPage === page ? " bg-[#B88E2F] text-white " : "text-black bg-[#F9F1E7] "}`}
                            >
                                {page}
                            </button>
                        ))
                }
                {error ? null : loading ? null : <button onClick={handleNext} disabled={currentPage === totalPages} className={`self-center  h-[30px] px-5 py-4 flex items-center justify-center md:h-[60px] md:w-[98px] bg-[#F9F1E7] rounded-[10px] text-base md:text-lg font-normal  text-[#000000] hover:bg-[#B88E2F] transition-all ease-in-out duration-150 hover:text-white  ${currentPage === totalPages ? "bg-[#c0c0c0] cursor-not-allowed pointer-events-none " : "cursor-pointer"} `} >Next</button>}
            </div>
            <ServiceHighlights />
        </div>
    )
}