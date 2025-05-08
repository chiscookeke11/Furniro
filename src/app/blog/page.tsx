"use client"


import BlogCard from "app/components/BlogCard";
import BlogCategoryFilter from "app/components/BlogCategoryFilter";
import RecentPosts from "app/components/RecentPosts";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import { Blog } from "interfaces/BlogInterface";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";




export default function Page() {
    const [blogData, setBlogData] = useState<Blog[]>([])


    useEffect(() => {

        const fetchBlogs = async () => {


            const { data, error } = await supabase.from('blogs').select('*');

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



            <div className=" py-[6%] px-[4%] flex items-start justify-between gap-10 flex-col md:flex-row "   >


                <section className=" flex flex-col items-start gap-18 " >
                    {
                        blogData?.map((blog, index) => (
                            <BlogCard key={index} blogData={blog} />
                        ))
                    }
                </section>

                <div className="flex flex-col gap-20 space-y-3 w-full  max-w-[280px] lg:max-w-[380px]">
  <BlogCategoryFilter />
  <RecentPosts />
</div>


            </div>






            <ServiceHighlights />
        </div>
    )
}