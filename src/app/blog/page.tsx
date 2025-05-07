"use client"


import BlogCard from "app/components/BlogCard";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import { Blog } from "interfaces/BlogInterface";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";




export default function Page() {
    const [blogData, setBlogData] = useState<Blog[]>([])


    useEffect(() => {

        const fetchBlogs = async () => {


            const {data, error} = await supabase.from ('blogs').select ('*');

            if (error) {
                console.error("Error fetching data", error);
                setBlogData([]);
            }
            else if (data) {
                setBlogData(data);
            }
        };

        fetchBlogs();
    }, [])


    console.log(blogData)


    return (
        <div>
<ReusableHero pageName="Blog" />






<section className=" flex flex-col items-start gap-10 " >
{
    blogData?.map((blog, index) => (
<BlogCard key={index} blogData={blog}  />
    ))
}
</section>






<ServiceHighlights/>
        </div>
    )
}