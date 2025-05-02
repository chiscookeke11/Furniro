import Image from "next/image"




interface DetailedDescriptionProps {
    detailed_description: string
    image1: string,
}

export default function DetailedDescription({ detailed_description, image1 }: DetailedDescriptionProps) {
    return (
        <section className=" w-full h-full flex flex-col items-center justify-start "  >
            <p className="w-[95%] md:w-[80%] text-justify text-[#9F9F9F] font-normal  text-base " > {detailed_description} </p>


            <div className="w-full h-full flex flex-row items-center justify-center gap-5 mt-[30px] "   >
                <div className=" w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[608px] lg:h-[305px]  bg-[#FAF3EA] flex items-center justify-center relative  " >
                    <Image src={image1} alt="image" fill className="w-full h-full object-cover absolute top-0 left-0 " />
                </div>
                <div className=" w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[608px] lg:h-[305px]  bg-[#FAF3EA] flex items-center justify-center relative  " >
                    <Image src={image1} alt="image" fill className="w-full h-full object-cover absolute top-0 left-0  " />
                </div>
            </div>
        </section>
    )
}