import { InspirationItem } from "interfaces/InspirationItem";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react"




interface InspirationSliderProps {
    Images: InspirationItem[];
}




export default function InspirationSlider({ Images } : InspirationSliderProps) {


    const [currentIndex, setCurrentIndex] = useState(0);
    const nextView = currentIndex + 1 >= Images.length ? 0 : currentIndex + 1;


    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? Images.length - 1 : prev - 1));
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === Images.length - 1 ? 0 : prev + 1));
    };





    return (
        <div className="w-full ml-auto relative p-2 " >




            <div className="w-full h-full flex items-start  gap-5 "  >


                <div className="relative w-full overflow-hidden max-w-[500px] h-[582px]  ">


                    <div className="absolute  bottom-[10%] left-[8%]  z-10 flex items-end gap-0 " >


                        <div className=" bg-opacity-70 rounded shadow-md bg-[#FFFFFFB8] w-[217px] h-[130px] flex flex-col items-center justify-center gap-3 p-2  ">

                            <p className=" text-[#3A3A3A] font-semibold text-[18px] "> 01 Bed Room </p>
                            <p className=" text-[#3A3A3A] font-semibold text-[28px] ">{Images[currentIndex]?.name}</p>
                        </div>
                        <div  onClick={nextSlide} className=" bg-[#B88E2F] w-12 h-12 text-white flex items-center justify-center cursor-pointer  "><ArrowRight /></div>
                    </div>
                    <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{
                            width: `${Images.length * 100}%`,
                            transform: `translateX(-${(100 / Images.length) * currentIndex}%)`,
                        }}
                    >
                        {Images.map((img, index) => (
                            <div
                                key={index}
                                className="relative px-2"
                                style={{
                                    width: `${100 / Images.length}%`,
                                    flex: "0 0 auto",
                                }}
                            >
                                <div className="relative w-full h-full  overflow-hidden">
                                    <Image
                                        src={img.image_url}
                                        alt="slide image"
                                        fill
                                        className="object-contain md:object-cover"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>

                </div>








                <div className="h-full md:flex w-full  flex-col gap-5 max-w-[400px] hidden " >

                    <div className="nextSlide h-[450px] relative w-[350px] bg-orange-300  ">

                        {Images[nextView]?.image_url? <Image
                            src={Images[nextView]?.image_url || Images[0]?.image_url}
                            alt="next preview"
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                        /> : "loading"
                        }


                    </div>


                    <div className="flex items-center justify-center gap-2">
                        {
                            Images.map((_, index) => (
                                <button onClick={() => setCurrentIndex(index)} key={index} className={` cursor-pointer  rounded-full transition-all duration-300 flex items-center justify-center bg-white border-[2px]  ${ currentIndex === index ? " border-[#B88E2F] w-5 h-5 p-1 " : " border-white w-3 h-3" } `} >
                                    <span className={`block w-full h-full rounded-full transition-all duration-300   ${currentIndex === index ? "bg-[#B88E2F]" : "bg-[#B88E2F]" } `} ></span>
                                </button>
                            ))
                        }
                    </div>
                </div>






            </div>

            <button
                onClick={prevSlide}
                className=" md:hidden absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full  z-10 cursor-pointer text-[#B88E2F] h-12 w-12 flex items-center justify-center shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)]   "
            >
                <ChevronLeft />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full  z-10 cursor-pointer text-[#B88E2F] h-12 w-12  items-center justify-center shadow-[0px_4px_14px_1px_rgba(0,0,0,0.16)]   "
            >
                <ChevronRight />
            </button>
        </div>
    )
}