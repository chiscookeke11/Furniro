import { BetweenHorizontalEnd, LayoutGrid, SlidersHorizontal } from "lucide-react";


interface StatsBarProps{
    totalFurniture: number;
    displayStart: number;
    displayEnd: number;
    setGrid: React.Dispatch<React.SetStateAction<boolean>>;
    grid: boolean;
}


export default function StatsBar({totalFurniture, displayStart, displayEnd, setGrid, grid} : StatsBarProps) {




    return (
     <section className="bg-[#F9F1E7] w-full h-[100px] flex items-center justify-between gap-10 text-[#000000] px-7 py-4 " >


        {/* left part  */}
        <div className="flex basis-1/2 min-w-sm gap-4] items-center justify-evenly " >
        <div className="flex items-center justify-center  gap-8" >
           <button className="flex items-center justify-center gap-5 cursor-pointer text-lg font-normal text-[#000000] "  ><SlidersHorizontal size={28} className="hover:scale-110 transform transition-all ease-in-out duration-150 " /> Filter</button>
           <button onClick={() => setGrid(true)}  className={`flex items-center justify-center gap-5 cursor-pointer `} ><LayoutGrid  size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? "scale-110" : null } `}  /> </button>
           <button  onClick={() => setGrid(false)}   className="flex items-center justify-center gap-5 cursor-pointer "><BetweenHorizontalEnd size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? null : "scale-110" } `} /></button>
        </div>

  <p className="text-base font-normal text-[#000000] " >Showing {displayStart ? displayStart : null} – {displayEnd ? displayEnd : null } of {totalFurniture ? totalFurniture : null} results</p>
        </div>




        {/* right part  */}
        <div className="bg-red-500 flex items-center justify-evenly gap-6 " >
          <p>Show <span>16</span>  </p>
          <p>Short by <span>Default</span></p>
        </div>
     </section>
    )
}