



import Image from "next/image"
import Loader from "./ui/Loader"
import { Blog } from "interfaces/BlogInterface"

interface RecentPostsProps {
blogData: Blog[];
}






export default function RecentPosts({blogData}: RecentPostsProps) {



const recentPosts =  [...blogData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());



    return (
        <div className="w-full max-w-[251px] mx-auto  p-2 flex flex-col items-start gap-6 font-poppins  " >
            <h2 className=" text-[#000000] font-medium text-2xl "  >Recent Posts</h2>


            {recentPosts && recentPosts.length > 0 ? (
                recentPosts.slice(0, 5).map((recentPost, index) => (
                    <div key={index} className="flex items-center gap-2 cursor-pointer hover:bg-[#FAF3EA] transition-all duration-150 ease-in-out w-full p-1 rounded-[4px]">
                        <Image src={recentPost.image} alt={recentPost.title || "Post image"} height={80} width={80} className="rounded-[10px] object-cover" />
                        <div className="text-[#000000] font-normal">
                            <h3 className="text-sm">{recentPost.title}</h3>
                            <small className="text-xs text-[#9F9F9F]"> {new Date(recentPost.created_at).toLocaleDateString("en-us") }  </small>
                        </div>
                    </div>
                ))
            ) : (
                <Loader />
            )}



        </div>
    )
}