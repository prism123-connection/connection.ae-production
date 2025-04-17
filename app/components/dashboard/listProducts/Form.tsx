"use client"
import React from "react";
import { useForm } from "react-hook-form";
import ProductInformationInputs from "./ProductInfoInputs";
import LiveScheduler from "./LiveScheduler";
// import ActionButtons from "@/app/components/ui/ActionButton";

export interface ProductFormData {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  goLiveAt: string | Date; // depending on how you're handling dates in your form
  userId: string;

  tags: string[]; // array of tag values, e.g., ["gaming", "rgb"]
  productImages: File[]; // or: string[] if you're using URLs directly
}

const ProductUploadForm: React.FC = () => {

  const onSubmit = (data: ProductFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form
    //   onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white flex flex-col overflow-hidden items-center justify-center px-2.5 py-10 w-full"
    >
      <div className="flex w-full flex-col">
        <ProductInformationInputs />
      </div>
    </form>
  );
};

export default ProductUploadForm;
