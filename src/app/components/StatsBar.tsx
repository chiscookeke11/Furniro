"use client"

import { BetweenHorizontalEnd, ChevronDown, ChevronUp, LayoutGrid, SlidersHorizontal } from "lucide-react";



interface StatsBarProps{
    totalFurniture: number;
    displayStart: number;
    displayEnd: number;
    setGrid: React.Dispatch<React.SetStateAction<boolean>>;
    grid: boolean;
    itemsPerPage: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}


export default function StatsBar({totalFurniture, displayStart, displayEnd, setGrid, grid, itemsPerPage, setItemsPerPage} : StatsBarProps) {



  const increaseDisplay = () => {
    if (itemsPerPage != totalFurniture ) {
      setItemsPerPage((prev) => prev + 1)
    }
    else {
      return false
    }
  }


  const decreaseDisplay = () => {
    if (itemsPerPage > 1  ) {
      setItemsPerPage((prev) => prev - 1)
    }
    else {
      return false
    }
  }




    return (
     <section className="bg-[#F9F1E7] w-full h-[100px] flex items-center justify-between gap-10 text-[#000000] px-7 py-4 " >


        {/* left part  */}
        <div className="flex basis-1/2 min-w-sm gap-8 items-center justify-start   pl-[5%] " >
        <div className="flex items-center justify-center  gap-7" >
           <button className="flex items-center justify-center gap-5 cursor-pointer text-lg font-normal text-[#000000] "  ><SlidersHorizontal size={28} className="hover:scale-110 transform transition-all ease-in-out duration-150 " /> Filter</button>
           <button onClick={() => setGrid(true)}  className={`flex items-center justify-center gap-5 cursor-pointer `} ><LayoutGrid  size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? "scale-110" : null } `}  /> </button>
           <button  onClick={() => setGrid(false)}   className="flex items-center justify-center gap-5 cursor-pointer "><BetweenHorizontalEnd size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? null : "scale-110" } `} /></button>
        </div>



  <p className="text-base font-normal text-[#000000] border-l-[2px] border-[#9F9F9F] pl-[4%]  " >Showing {displayStart ? displayStart : null} – {displayEnd ? displayEnd : null } of {totalFurniture ? totalFurniture : null} results</p>
        </div>




        {/* right part  */}
        <div className=" flex items-center justify-evenly gap-6 " >
          <div className='flex items-center' > <span>Show</span>
              <div className="flex items-center justify-between bg-[#FFFFFF] h-[55px] w-[55px] outline-none border-none mx-5 py-2 px-2 text-center  " >
                <span className="   ">{itemsPerPage} </span>
                <div className=" flex flex-col items-center justify-evenly " >
                  <button onClick={increaseDisplay} className="cursor-pointer   " > <ChevronUp size={15}/> </button>
                  <button onClick={decreaseDisplay}><ChevronDown  size={15}/> </button>
                </div>
              </div>



          Sort by <input type="text" placeholder="Default" className=" bg-[#FFFFFF] h-[55px] w-[188px] outline-none border-none mx-5  p-2 pl-[5%] "  />   </div>
        </div>
     </section>
    )
}