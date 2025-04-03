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
  images: File[];
  price: {
    currency: string;
    amount: number;
  };
  category: string;
  tags: string[];
  liveSchedule: {
    date: Date;
    time: string;
  };
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
        <LiveScheduler  />
        {/* <ActionButtons
          onCancel={() => form.reset()}
          onSubmit={form.handleSubmit(onSubmit)}
        /> */}
      </div>
    </form>
  );
};

export default ProductUploadForm;
