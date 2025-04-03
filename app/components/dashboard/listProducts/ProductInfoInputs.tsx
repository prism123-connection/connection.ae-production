"use client"
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "./Form";
import InputField from "@/app/components/ui/InputFields";
import ImageUpload from "@/app/components/ui/ImageUpload";
import TagSelector from "@/app/components/ui/TagSelector";


const recommendedTags = [
    "Keyboard",
    "Gaming Keyboard",
    "Mechanical keyboard",
    "RGB Keyboard",
    "Vibrant Colors",
    "Sand Resistant",
    "Stylish Design",
    "High performance",
  ];

const ProductInformationInputs = ({  }) => {
  return (
    <section className="mb-10">
      <h2 className="text-[rgba(0,22,37,1)] text-xl font-semibold mb-8">
        Product Information
      </h2>

      <InputField
        label="Product Name"
       placeholder="Enter Product name"
        // {...form.register("name")}
        className="mb-8"
      />

      <InputField
        label="Product Short Description"
        placeholder="Enter product short description"
        // {...form.register("shortDescription")}
        className="mb-8"
      />

      <div className="mb-8">
        <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
          Product Images
        </h3>
        <ImageUpload 
        onChange={(files) => console.log(files)} 
        />
      </div>

      <div className="mb-8">
        <h3 className="text-[#62676C] text-base font-semibold mb-[5px]">
          Product Description
        </h3>
        <textarea
          className="w-full p-4 border rounded-[10px] border-[rgba(197,197,197,1)] min-h-[100px]"
          placeholder="A detailed description of the product helps customers to learn more about the product."
        //   {...form.register("description")}
        />
        <div className="flex items-center gap-1 text-[13px] text-[#9C9CA3] mt-[5px]">
          <span className="w-5 h-5" />
          <span>0/800</span>
        </div>
      </div>

      <div className="flex gap-[31px] flex-wrap">
        <div className="w-[210px]">
          <InputField
            label="Product Price Currency"
            type="select"
            options={[{ label: "Unselected", value: "" }]}
            // {...form.register("price.currency")}
          />
        </div>
        <div className="min-w-60 w-[369px]">
          <InputField
            label="Product Price"
            type="number"
            placeholder="Please enter the product currency first."
            // {...form.register("price.amount")}
          />
        </div>
      </div>

      <div className="mb-[42px]">
        <label className="text-[#62676C] font-semibold block mb-[5px]">
          Product Category
        </label>
        <select
          className="border w-full min-h-[46px] px-4 py-3.5 rounded-[10px] border-[rgba(197,197,197,1)]"
        //   {...form.register("category")}
        >
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <div>
        <h3 className="text-[#62676C] text-xl font-semibold mb-4">
          Product Tags
        </h3>
        <p className="text-sm mb-4">Recommended Tags</p>
        <TagSelector
          tags={recommendedTags}
          onTagsChange={(tags) =>console.log(tags)}
        //   onTagsChange={(tags) => form.setValue("tags", tags)}
        />
      </div>
    </section>
  );
};

export default ProductInformationInputs;