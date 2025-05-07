import { Blog } from "interfaces/BlogInterface";
import Image from "next/image";



interface BlogCardProps {
    blogData: Blog;
}


export default function BlogCard({blogData}: BlogCardProps ) {
    return (
        <div className="w-full max-w-[820px] min-w-[300px] lg:h-[794px] bg-red-800 flex flex-col items-start gap-4  "  >
            {/* blog image */}
            <div className=" w-full h-[62.97%] bg-pink-500 rounded-[10px] overflow-hidden  " >
                <Image src={blogData.image} height={100} width={100} alt={blogData.title} className="w-full h-full object-cover  " />
            </div>



            {/* content section  */}
            <div className="w-full flex flex-col items-start gap-4  " >
                <ul className="w-full flex items-center justify-start gap-5 " >
                    <li> {blogData.blogger} </li>
                    <li> {new Date(blogData.created_at).toLocaleDateString("en-us")  } </li>
                    <li> {blogData.category} </li>
                </ul>
                <h2>  {blogData.title}</h2>
                <p> {blogData.blog_content.trim().slice(0, 500)} </p>

                <button> Read more  </button>

            </div>


        </div>
    )
}