"use client";

import BlogCard from "app/components/BlogCard";
import BlogCategoryFilter from "app/components/BlogCategoryFilter";
import RecentPosts from "app/components/RecentPosts";
import ReusableHero from "app/components/ReusableHero";
import ServiceHighlights from "app/components/ServiceHighlights";
import { Blog } from "interfaces/BlogInterface";
import { useEffect, useState } from "react";
import { supabase } from "utils/supabaseClient";

export default function Page() {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [sliceValue, setSliceValue] = useState(3);
  const [filterBy, setFilterBy] = useState("Wood");

  // Fetch all blogs once
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");

      if (error) {
        console.error("Error fetching data", error);
        setAllBlogs([]);
      } else if (data) {
        setAllBlogs(data);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs when filterBy or allBlogs changes
  useEffect(() => {
    const filtered = filterBy === "All"
      ? allBlogs
      : allBlogs.filter((blog) => blog.category === filterBy);
    setFilteredBlogs(filtered);
    setSliceValue(3); // Reset slice on filter change
  }, [filterBy, allBlogs]);

  const increaseSlice = () => {
    setSliceValue((prev) => prev + 3);
  };

  return (
    <div>
      <ReusableHero pageName="Blog" />

      <div className="py-[6%] px-[4%] flex items-start justify-between gap-10 flex-col md:flex-row">
        <section className="flex flex-col items-start gap-18">
          {filteredBlogs?.slice(0, sliceValue).map((blog, index) => (
            <BlogCard key={index} blogData={blog} />
          ))}
          {sliceValue < filteredBlogs.length && (
            <button
              onClick={increaseSlice}
              className="font-poppins w-[245px] h-12 bg-white border-[1px] border-[#B88E2F] text-[#B88E2F] text-base font-semibold cursor-pointer mx-auto"
            >
              See More
            </button>
          )}
        </section>

        <div className="flex flex-col gap-20 space-y-3 w-full max-w-[280px] lg:max-w-[380px]">
          <BlogCategoryFilter blogData={allBlogs} setFilterBy={setFilterBy} />
          <RecentPosts blogData={allBlogs} />
        </div>
      </div>

      <ServiceHighlights />
    </div>
  );
}
