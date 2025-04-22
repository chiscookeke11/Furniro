"use client"

import { useFurniroContext } from "context/FurniroContext";
import { BetweenHorizontalEnd, ChevronDown, ChevronUp, LayoutGrid, SlidersHorizontal } from "lucide-react";





interface StatsBarProps{
    totalFurniture: number;
    displayStart: number;
    displayEnd: number;
    setGrid: React.Dispatch<React.SetStateAction<boolean>>;
    grid: boolean;
    itemsPerPage: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}


export default function StatsBar({totalFurniture, displayStart, displayEnd, setGrid, grid, itemsPerPage, setItemsPerPage, setCurrentPage} : StatsBarProps) {


  const {optionValue, setOptionValue, setLoading} = useFurniroContext();


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


  const selectOptions = [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Living room",
      value: "Living_room",
    },
    {
      label: "Dining set",
      value: "Dining_set",
    },
    {
      label: "bedroom",
      value: "bedroom",
    },
    ]

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLoading(true);
      setOptionValue(event.target.value);
      setCurrentPage(1)
    }





    return (
     <section className="bg-[#F9F1E7] w-full min-h-[100px] flex flex-col md:flex-row items-center justify-between gap-10 text-[#000000] px-4 md:px-7 py-4 " >


        {/* left part  */}
        <div className="flex w-full max-w-[700px]  md:pr-[5%]  min-w-[250px] gap-8 items-center justify-center md:justify-start   md:pl-[4%] flex-wrap md:flex-nowrap " >





        <div className="flex items-center justify-center  gap-7" >
           <button className="flex items-center justify-center gap-5 cursor-pointer text-lg font-normal text-[#000000] "  ><SlidersHorizontal size={28} className="hover:scale-110 transform transition-all ease-in-out duration-150 " /> Filter</button>
           <button onClick={() => setGrid(true)}  className={`flex items-center justify-center gap-5 cursor-pointer `} ><LayoutGrid  size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? "scale-110" : null } `}  /> </button>
           <button  onClick={() => setGrid(false)}   className="flex items-center justify-center gap-5 cursor-pointer "><BetweenHorizontalEnd size={28} className={`hover:scale-110 transform transition-all ease-in-out duration-150 ${grid? null : "scale-110" } `} /></button>
        </div>



  <p className="text-base font-normal text-[#000000] md:border-l-[2px] md:border-[#9F9F9F] md:pl-[4%]  " >Showing {displayStart ? displayStart : "-" } – {displayEnd ? displayEnd : "-" } of {totalFurniture ? totalFurniture : null} results</p>
        </div>




        {/* right part  */}
        <div className=" w-fit flex items-center justify-evenly gap-6 " >
          <div className='flex items-center' > <span>Show</span>
              <div className="flex items-center justify-between bg-[#FFFFFF] min-h-[55px] min-w-[55px] outline-none border-none mx-5 py-2 px-2 text-center  " >
                <span className="cursor-not-allowed   ">{itemsPerPage} </span>
                <div className=" flex flex-col items-center justify-evenly " >
                  <button onClick={increaseDisplay} className="cursor-pointer   " > <ChevronUp size={15}/> </button>
                  <button onClick={decreaseDisplay}  className="cursor-pointer   " ><ChevronDown  size={15}/> </button>
                </div>
              </div>



        <p className="whitespace-nowrap" >  Sort by</p>

           <select name="default" onChange={handleSelect} value={optionValue} className=" bg-[#FFFFFF] h-[55px] min-w-[70px] md:min-w-[188px] outline-none border-none mx-2 md:mx-5  p-2 pl-[5%] cursor-pointer "  >
            {selectOptions.map((option, index) => (
              <option key={index} value={option.value} > {option.label} </option>
            ))}
           </select>

            </div>
        </div>
     </section>
    )
}