"use client";

import React, { FormEvent, useState } from "react";
import Input from "./ui/Input";
import Loader from "./ui/Loader";
import { supabase } from "utils/supabaseClient";
import { toast } from "sonner";

const STORAGE_BUCKET = "furniro";

export default function FurnitureUploadForm() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [furnitureValues, setFurnitureValue] = useState({
    furnitureName: "",
    description: "",
    price: "",
    newPrice: "",
    detailedDescription: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if ((name === "price" || name === "newPrice") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFurnitureValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, imageFile);

        if (uploadError) {
          console.log("Image upload error", uploadError);
          toast.error("Image upload failed!");
          return;
        }

        const { data } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("furniture").insert({
        name: furnitureValues.furnitureName,
        price: parseFloat(furnitureValues.price),
        image_url: imageUrl,
        description: furnitureValues.description,
        new_price: parseFloat(furnitureValues.newPrice),
        category: furnitureValues.category,
        detailed_description: furnitureValues.detailedDescription,
      });

      if (error) {
        console.error("Error uploading furniture", error);
        toast.error("Error uploading furniture data");
      } else {
        setFurnitureValue({
          furnitureName: "",
          description: "",
          price: "",
          newPrice: "",
          detailedDescription: "",
          category: "",
        });
        setImageFile(null);
        toast.success("Upload successful");
      }
    } catch (err) {
      console.error("Unexpected error", err);
      toast.error("Unexpected error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const furnitureCategory = [
    { label: "Bedroom", value: "bedroom" },
    { label: "Dining set", value: "dining_set" },
    { label: "Living room", value: "living_room" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[635px] flex flex-col items-start gap-5 p-1"
    >
      <Input
        inputId="furnitureName"
        label="Name"
        name="furnitureName"
        placeholder="Enter furniture name"
        type="text"
        required
        onChange={handleChange}
        value={furnitureValues.furnitureName}
        errorMessage=""
        className=""
      />

      <Input
        inputId="description"
        label="Brief Description"
        name="description"
        placeholder="Write a brief description"
        type="text"
        required
        onChange={handleChange}
        value={furnitureValues.description}
        errorMessage=""
        className=""
      />

      <div className="w-full">
        <h2 className="text-base font-medium text-[#000000] mb-2">
          Select category
        </h2>
        <div className="w-full flex flex-wrap items-center gap-5">
          {furnitureCategory.map((cat, index) => (
            <label
              key={index}
              htmlFor={cat.label}
              className="text-sm font-medium text-[#000000] gap-1 flex items-center"
            >
              <input
                type="radio"
                name="category"
                id={cat.label}
                value={cat.value}
                checked={furnitureValues.category === cat.value}
                onChange={handleChange}
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      <Input
        inputId="price"
        label="Price"
        name="price"
        placeholder="Enter furniture price"
        type="text"
        required
        onChange={handleChange}
        value={furnitureValues.price}
        errorMessage=""
        className=""
      />

      <Input
        inputId="newPrice"
        label="Discount Price"
        name="newPrice"
        placeholder="Enter discount price"
        type="text"
        required
        onChange={handleChange}
        value={furnitureValues.newPrice}
        errorMessage=""
        className=""
      />

      <Input
        inputId="detailedDescription"
        label="Detailed description"
        name="detailedDescription"
        placeholder="Enter a detailed description"
        type="text"
        required
        onChange={handleChange}
        value={furnitureValues.detailedDescription}
        errorMessage=""
        className=""
      />

      <label
        htmlFor="imageFile"
        className="text-sm font-medium text-[#000000] mb-2 flex flex-col gap-1"
      >
        Furniture Image
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 cursor-pointer"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-[#B88E2F] rounded-[5px] w-[237px] h-[55px] cursor-pointer text-white text-base font-normal disabled:bg-gray-400"
        disabled={isUploading}
      >
        {isUploading ? <Loader /> : "Upload"}
      </button>
    </form>
  );
}
