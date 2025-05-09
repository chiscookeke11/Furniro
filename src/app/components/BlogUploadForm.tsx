"use client";

import { useState, FormEvent } from "react";
import Input from "./ui/Input";
import { supabase } from "utils/supabaseClient";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  id: string;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
};

export default function BlogUploadForm() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [blogUploadValues, setBlogUploadValues] = useState({
    title: "",
    content: "",
    blogger: "admin",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogUploadValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const { error } = await supabase.from("blogs").insert({
      title: blogUploadValues.title,
      blog_content: blogUploadValues.content,
      category: blogUploadValues.category,
      blogger: blogUploadValues.blogger,
    });

    setIsUploading(false);

    if (error) {
      console.error("Error uploading blog:", error);
      showToast({
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
        button: {
          label: "Close",
          onClick: () => {},
        },
      });
    } else {
      setBlogUploadValues({
        title: "",
        content: "",
        blogger: "admin",
        category: "",
      });

      showToast({
        title: "Upload Successful",
        description: "Your blog has been uploaded!",
        button: {
          label: "Great",
          onClick: () => {},
        },
      });
    }
  };

  function showToast(toast: Omit<ToastProps, "id">) {
    return sonnerToast.custom((id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        button={toast.button}
      />
    ));
  }

  function Toast(props: ToastProps) {
    const { title, description, button, id } = props;

    return (
      <div className="flex flex-col md:flex-row gap-4 rounded-lg bg-white shadow-md ring-1 ring-gray-200 w-full max-w-sm p-4">
        <div className="flex flex-col flex-1">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <button
          onClick={() => {
            button.onClick();
            sonnerToast.dismiss(id);
          }}
          className="self-start md:self-center mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 py-1.5 rounded"
        >
          {button.label}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[635px] flex flex-col items-start gap-5 p-1"
    >
      <Input
        errorMessage=""
        inputId="title"
        label="Title"
        name="title"
        placeholder="Enter blog title"
        type="text"
        value={blogUploadValues.title}
        onChange={handleChange}
      />

      <Input
        name="content"
        id="content"
        placeholder="Upload blog content"
        value={blogUploadValues.content}
        label="Blog content"
        onChange={handleChange}
      />

      <div className="w-full">
        <h2 className="text-base font-medium text-[#000000] mb-2">
          Select category
        </h2>

        <div className="w-full flex items-center gap-5">
          {["wood", "crafts", "design", "handmade", "interior"].map((cat) => (
            <label
              key={cat}
              htmlFor={cat}
              className="text-sm font-medium text-[#000000] gap-1 flex items-center"
            >
              <input
                type="radio"
                name="category"
                id={cat}
                value={cat}
                checked={blogUploadValues.category === cat}
                onChange={handleChange}
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal"
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
