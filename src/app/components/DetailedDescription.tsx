



interface DetailedDescriptionProps {
    detailed_description: string
}

export default function DetailedDescription({detailed_description}: DetailedDescriptionProps ) {
    return (
        <section  className=" w-full h-full flex flex-col items-center justify-start "  >
            <p className="w-[80%] text-justify text-[#9F9F9F] font-normal  text-base " > {detailed_description} </p>


            <div className="w-full h-full flex flex-row items-center justify-center gap-10  "   >
<div className=" w-full h-full min-h-[100px] max-w-[605px] max-h-[348px] bg-[#FAF3EA] flex items-center justify-center relative  " >
      </div>
            </div>
        </section>
    )
}