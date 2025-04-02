import { RangeCardData } from "data/Mockdata";
import Image from "next/image";



export default function Range() {









    return (
        <section className="font-poppins w-full flex flex-col items-center justify-center px-5 py-16 gap-10   " >

            <div className="flex flex-col items-center justify-center gap-2 text-center " >
                <h1 className=" text-[#333333] font-bold text-[32px] leading-[32px] "  >Browse The Range</h1>
                <p className="text-[#666666] text-xl font-normal " >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className=" w-full flex items-center justify-center gap-5 " >




                {RangeCardData.map((card, index) => (
                    <div key={index} className=" flex flex-col items-center gap-8 " >


                        <div className="w-full max-w-[381px] min-w-[100px] max-h-[480px] min-h-[100px] bg-[#B88E2F] flex items-center justify-center object-contain overflow-hidden rounded-[12px]  "   >

                            <Image src={card.image} width={100} height={100} alt="Image" className="w-full h-full" />
                        </div>


                        <h2 className="text-[#333333] text-base md:text-2xl font-semibold "  > {card.name} </h2>

                    </div>
                ))}

            </div>

        </section>
    )
}