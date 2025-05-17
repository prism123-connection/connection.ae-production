"use client"
import EcommerceCategories from '@/app/components/dashboard/ecommerce/main/Categories'
import EcomHeader from '@/app/components/dashboard/ecommerce/main/ECHeader'
import EcommerceProductsSection from '@/app/components/dashboard/ecommerce/main/Products'
import SectionHeader from '@/app/components/SectionHeader'  
import { getAllProducts } from '@/lib/ecommerce/ecommerceHelper'
import React, { useEffect, useState } from 'react'


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


function ECommerce() {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [initialData , setInitialData] = useState<Product[]>([]);

  
    async function fetchAllProducts() {
      setLoading(true)
      try {
        const data = await getAllProducts(); // Calls your fetcher under the hood
        setProducts(data)
        setInitialData(data)
        setLoading(false)
        console.log(data)
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        return [];
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
  
      fetchAllProducts()
  
    }, [])

   const filterProductsByCategory = ( selectedCategory: string) => {
    if (selectedCategory === "exploreAll"){
      setProducts(initialData )
      return; 
    };
    const newData = initialData .filter(product => product.category === selectedCategory);
    setProducts(newData)
    return; 
}


  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-10'>
        <EcomHeader/>
        <EcommerceCategories onCategorySelect={filterProductsByCategory} />
        <EcommerceProductsSection loading={loading} products={products}/>
    </SectionHeader>  )
}

export default ECommerce