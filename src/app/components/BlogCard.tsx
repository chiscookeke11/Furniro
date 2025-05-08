import { Blog } from "interfaces/BlogInterface";
import { Calendar1, Tag, User } from "lucide-react";
import Image from "next/image";



interface BlogCardProps {
    blogData: Blog;
}


export default function BlogCard({blogData}: BlogCardProps ) {
    return (
        <div className="w-full max-w-[820px] min-w-[300px] lg:h-[794px] flex flex-col items-start gap-4  font-poppins p-2 "  >
            {/* blog image */}
            <div className=" w-full h-[62.97%]  rounded-[10px] overflow-hidden  " >
                <Image src={blogData.image} height={100} width={100} alt={blogData.title} className="w-full h-full object-cover  " />
            </div>



            {/* content section  */}
            <div className="w-full flex flex-col items-start gap-4  " >
                <ul className="w-full flex items-center justify-start gap-5 " >
                    <li className=" flex items-center text-[#9F9F9F] font-normal text-[15px] gap-1 " > <User size={15} /> {blogData.blogger} </li>
                    <li className=" flex items-center text-[#9F9F9F] font-normal text-[15px]  gap-1"><Calendar1  size={15}/> {new Date(blogData.created_at).toLocaleDateString("en-us")  } </li>
                    <li className=" flex items-center text-[#9F9F9F] font-normal text-[15px] gap-1 "><Tag size={15}/> {blogData.category} </li>
                </ul>
                <h2 className="text-[#000000] text-[30px] font-medium "  >  {blogData.title}</h2>
                <p className=" text-[#9F9F9F] font-normal text-[15px] text-justify "  > {blogData.blog_content.trim().slice(0, 500)} </p>

                <button className=" text-[#000000] font-normal text-base  cursor-pointer "  > Read more  <hr className="w-[90%] h-[2px] bg-black mx-auto mt-2 " /> </button>

            </div>


        </div>
    )
}