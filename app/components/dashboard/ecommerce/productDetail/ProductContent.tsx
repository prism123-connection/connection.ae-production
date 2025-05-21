"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { ProductImage } from './ProductImage'
import { ProductTimer } from './ProductTimes'
import ProductActions from './ProductAction'
import { useSearchParams } from 'next/navigation'
import { createWishlistItem, getProductById } from '@/lib/ecommerce/ecommerceHelper'
import { toast } from 'sonner'

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  goLiveAt: string;      // Use `string` if it's serialized JSON from API
  createdAt: string;

  userId: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
  };

  tags: {
    id: string;
    value: string;
  }[];

  productImages: {
    id: string;
    url: string;
    createdAt: string;
  }[];
};

function ProductContentSection() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';  
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string  >('');
  const [loading, setLoading] = useState(false)

        useEffect(() => {
          if (!id) return;
        
          setLoading(true);
        
          getProductById(id)
            .then((data) => {
              setProduct(data);
              setSelectedImage(data.productImages[0]?.url);
            })
            .catch((err) => {
              setError('Failed to load product');
            })
            .finally(() => {
              setLoading(false);
            });
        
        }, [id]);

    const addToWishList = async () => {
      try {
        await createWishlistItem( id );
        toast.success('Item added to wishlist');
      } catch (error: any) {
        console.error('Failed to add item wishlist', error.message || error);
        toast.success('Failed to add item wishlist');
      }
    };

  if (error) return <div>{error}</div>;
  if (!product || loading) return    <div className="w-full bg-white rounded-lg flex p-16 flex-col px-8 items-end">
  <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
</div>

  return (
    <article className="bg-white flex items-center gap-5 overflow-hidden justify-center mt-5 min-w-full p-5 ">
    <div className="self-stretch min-w-60 w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className=' min-w-[45%] flex flex-col items-center'>
        <ProductImage
          src={selectedImage}
          alt={product.name}
        />

        <div className="flex gap-2 justify-center flex-wrap mt-5">
                {product.productImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === image.url ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              </div>
       

        <section className=" ml-5 min-w-[50%] relative ">
          <div className="flex w-full flex-col max-md:max-w-full">
            <div className="self-stretch flex w-full flex-col items-stretch  pl-1.5 max-md:max-w-full">
              <header className="flex gap-[40px_104px] flex-wrap max-md:max-w-full max-md:mr-0.5">
                <div className="min-w-60 text-base font-normal w-full">
                  <h1 className="text-black text-[32px] font-semibold">
                    {product.name}
                  </h1>
                  <p className="text-[rgba(150,150,150,1)] mt-[17px]">
                    
                  </p>
                  <p className="text-[rgba(39,39,39,1)] mt-[17px]">
                   {product.shortDescription}
                  </p>
                </div>
                <div className="flex gap-3 absolute right-0">
                  <button
                    onClick={addToWishList}
                    className="bg-[rgba(237,240,248,1)] flex items-center gap-[11px] w-10 p-3 rounded-lg cursor-pointer"
                    aria-label="Share"
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/412b04836b40d434a678cfbb9acc6a82850806a9?placeholderIfAbsent=true"
                      alt="Share"
                      className="aspect-[1.14] object-contain w-4 self-stretch my-auto"
                    />
                  </button>
                  <button
                    className="bg-[rgba(237,240,248,1)] flex items-center gap-[11px] w-10 h-10 p-3 rounded-lg"
                    aria-label="Like"
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/55728dac6b1a823761aa023152b52c4f8891e50a?placeholderIfAbsent=true"
                      alt="Like"
                      className="aspect-[1] object-contain w-4 self-stretch my-auto"
                    />
                  </button>
                </div>
              </header>

              <div className="w-full shrink-0 max-w-full h-[0.5px] mt-10 border-[rgba(228,228,228,1)] border-solid border-1" />

              <div className="flex items-center gap-[40px_64px] font-semibold whitespace-nowrap mt-8">
                <div className="self-stretch text-[32px] text-[rgba(34,92,202,1)] my-auto">
                 ${product.price}
                </div>
                <div className="self-stretch flex gap-2 text-sm text-black my-auto">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/155a3f0d2f057a71204764cdfeb5d903998db15c?placeholderIfAbsent=true"
                    alt="Rating"
                    className="aspect-[5] object-contain w-[100px] shrink-0"
                  />
                  <span className="opacity-50 w-8">(75)</span>
                </div>
              </div>

              <ProductTimer goLiveAt={product.goLiveAt}/>

              <div className="w-full shrink-0 max-w-full h-[0.5px] mt-10 border-[rgba(228,228,228,1)] border-solid border-1" />
            </div>

            <div className="text-[rgba(0,22,37,1)] text-base font-normal leading-6 mt-10 max-md:max-w-full">
            {product.description}
            </div>

            <ProductActions productId={id}/>
          </div>
        </section>
      </div>
    </div>
  </article>
  )
}

export default function ProductContent() {
  return (
    <Suspense fallback={<div>Loading Live Page...</div>}>
      <ProductContentSection/>
    </Suspense>
  );
}