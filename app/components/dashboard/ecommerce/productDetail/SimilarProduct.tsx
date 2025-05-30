"use client"
import React, { useEffect, useState } from 'react'
import { EcommerceProductCard } from '../main/ProductCard';
import { getAllProducts } from '@/lib/ecommerce/ecommerceHelper';

type Product = {
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

function SimilarProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setloading] = useState(false)

      async function fetchAllProducts() {
        setloading(true)
        try {
          const data = await getAllProducts(); // Calls your fetcher under the hood
          setProducts(data)
          setloading(false)
          return products;
      
        } catch (err) {
          console.error("❌ Failed to fetch products:", err);
          return [];
        } finally {
          setloading(false);
        }
      }
    
      useEffect(() => {
    
        fetchAllProducts()
    
      }, [])
    
  return (
      <section className='w-full mt-10'>
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-semibold text-black">
            View Similar Products
          </h2>
          <button className="text-neutral-50 rounded text-sm cursor-pointer bg-[#111] px-12 py-2 max-sm:px-6 max-sm:py-2 hover:bg-[#333] transition-colors hidden">
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

export default SimilarProduct