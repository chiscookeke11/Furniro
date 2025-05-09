import { useFurniroContext } from "context/FurniroContext"
import Image from "next/image"
import Loader from "./ui/Loader"








export default function RecentPosts() {


    const { tableData } = useFurniroContext()




    return (
        <div className="w-full max-w-[251px] mx-auto  p-2 flex flex-col items-start gap-6 font-poppins  " >
            <h2 className=" text-[#000000] font-medium text-2xl "  >Recent Posts</h2>


            {tableData && tableData.length > 0 ? (
                tableData.slice(0, 5).map((recentPost, index) => (
                    <div key={index} className="flex items-center gap-2 cursor-pointer hover:bg-[#FAF3EA] transition-all duration-150 ease-in-out w-full p-1 rounded-[4px]">
                        <Image src={recentPost.image_url} alt={recentPost.name || "Post image"} height={80} width={80} className="rounded-[10px] object-cover" />
                        <div className="text-[#000000] font-normal">
                            <h3 className="text-sm">{recentPost.name}</h3>
                            <small className="text-xs text-[#9F9F9F]">03 Aug 2022</small>
                        </div>
                    </div>
                ))
            ) : (
                <Loader />
            )}



        </div>
    )
}