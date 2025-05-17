"use client"
import React, { useEffect, useState } from 'react'
import { EcommerceProductCard } from './ProductCard';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '@/lib/ecommerce/ecommerceHelper';

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  goLiveAt: string;
  productImages: { url: string }[];
  tags: { value: string }[];
};

interface EcommerceProductsProps {
  products : Product[]
  loading: boolean
}
    

const EcommerceProductsSection: React.FC<EcommerceProductsProps> = ({products, loading}) => {

  if (loading) {
    return  <div className="w-full  rounded-lg flex p-16 flex-col px-8 items-end">
    <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
  </div>
  }

  return (
    <section className='w-full'>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-black">
          Latest Products
        </h2>
        <button  className="text-neutral-50 rounded text-sm cursor-pointer bg-[#111] px-12 py-2 max-sm:px-6 max-sm:py-2 hover:bg-[#333] transition-colors hidden ">
          View All
        </button>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-[30px] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
        {products.map((product, index) => (
          <EcommerceProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  )
}

export default EcommerceProductsSection



    // async function submitDemoProduct() {
    //   try {
    //     const response = await createProduct(demoProduct);
    //     console.log("Product created successfully:", response);
    //   } catch (err) {
    //     console.error("Product creation failed:", err);
    //   }
    // } 

    // async function handleDeleteProduct(productId: string) {
    //   try {
    //     const response = await deleteProduct(productId);
    //     console.log('✅ Product deleted successfully:', response);
    //     // Optionally, refresh data or navigate
    //   } catch (err) {
    //     console.error('❌ Failed to delete product:', err);
    //   }
    // } 

    
    // async function handleUpdateProduct() {
    //   const updatedData = {
    //     price: 1899.99,
    //     productImages: [
    //       'https://www.nvidia.com/content/nvidiaGDC/us/en_US/geforce/graphics-cards/_jcr_content/root/responsivegrid/nv_container_1965276325/nv_teaser_copy_1362348342.coreimg.100.850.jpeg/1735901765888/geforce-rtx-40-series-new.jpeg',
    //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCWEgBhGLiIMjfv8AULSGrKjhts8CD2Aivh0GGcFmEf7YBcEBTzZMRt4zew0zFR19gn8g&usqp=CAU',
    //       'https://images.csmonitor.com/csm/2025/01/1186731_1_010625-Jensen-Huang_standard.jpg?alias=standard_900x600',
    //     ],
    //   };
    
    //   const productId = '83a7a1d9-5a52-48e6-b14f-39ff2e995df8'; // Replace with actual product ID
    
    //   try {
    //     const result = await updateProduct(productId, updatedData);
    //     console.log('✅ Product updated:', result);
    //   } catch (err) {
    //     console.error('❌ Failed to update product:', err);
    //   }
    // }