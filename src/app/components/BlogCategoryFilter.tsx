"use client";

import { useState } from "react";
import Input from "./ui/Input";
import { Blog } from "interfaces/BlogInterface";

interface BlogCategoryFilterProps {
  blogData: Blog[];
  setFilterBy: (category: string) => void;
}

export default function BlogCategoryFilter({blogData, setFilterBy,}: BlogCategoryFilterProps) {
  const [searchValues, setSearchValues] = useState({ search: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const categoryCounts = blogData.reduce((acc: Record<string, number>, blog) => {
    const category = blog.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const buttons = Object.entries(categoryCounts).map(([label, amount]) => ({
    label,
    amount: String(amount),
  }));

  return (
    <div className="w-full flex flex-col items-center gap-7 font-poppins">
      <Input
        onChange={handleChange}
        type="search"
        placeholder="Search ..."
        name="search"
        inputId="search"
        label=""
        value={searchValues.search}
        errorMessage=""
        required={true}
        className=""
      />

      <div className="w-full max-w-[251px] mx-auto flex flex-col gap-2">
        <h2 className="text-[#000000] text-2xl font-medium">Categories</h2>

        <button
          onClick={() => setFilterBy("All")}
          className="w-full flex items-center justify-between cursor-pointer text-base font-normal text-[#9F9F9F] py-3"
        >
          <p>All</p>
          <p>{blogData.length}</p>
        </button>

        {buttons.map((button, index) => (
          <button
            onClick={() => setFilterBy(button.label)}
            key={index}
            className="w-full flex items-center justify-between cursor-pointer text-base font-normal text-[#9F9F9F] py-3"
          >
            <p>{button.label}</p>
            <p>{button.amount}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
