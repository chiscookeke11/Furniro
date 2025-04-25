import DetailedDescription from "./DetailedDescription";

interface DetailedInfoSectionProps{
    detailed_description: string,
}

export  default function DetailedInfoSection({detailed_description}: DetailedInfoSectionProps) {
    return (
        <section className="w-full h-full min-h-[60vh] py-[3%] px-[4%]  border-t-[1px] border-b-[1px] border-[#D9D9D9] "  >
           < DetailedDescription detailed_description={detailed_description}  />
        </section>
    )
}