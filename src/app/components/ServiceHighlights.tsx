import { BadgeCheck, Headset, Package, Trophy } from "lucide-react";




export default function ServiceHighlights() {


    const highlights = [
        {
            icon: <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />,
            heading: "High Quality",
            content: "crafted from top materials",
        },
        {
            icon: <BadgeCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />,
            heading: "Warranty Protection",
            content: "Over 2 years",
        },
        {
            icon: <Package className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />,
            heading: "Free Shipping",
            content: "Order over 150 $",
        },
        {
            icon: <Headset className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />,
            heading: "24 / 7 Support",
            content: "Dedicated support",
        },
    ]




    return (
        <section className="w-full bg-[#FAF3EA] min-h-[270px] flex flex-col md:flex-row  items-center md:justify-evenly py-10 md:px-6 px-3 gap-5 " >



            {highlights.map((highlight, index) => (
                <div key={index} className="w-full max-w-[380px] min-w-[250px] text-[#242424] flex items-center justify-start gap-[10px]  py-2 px-2   "  >
                    <div>
                        {highlight.icon}
                    </div>
                    <div>
                        <h2 className=" text-base md:text-[25px] font-semibold  " > {highlight.heading} </h2>
                        <p className="text-[#898989] text-sm md:text-lg font-medium " > {highlight.content} </p>
                    </div>
                </div>
            ))}

        </section>
    )
}