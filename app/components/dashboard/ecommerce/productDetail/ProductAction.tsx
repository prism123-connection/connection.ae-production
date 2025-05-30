"use client"
import ActionButton from '@/app/components/ui/ActionButton'
import { createCartItem, requestPurchaseProduct } from '@/lib/ecommerce/ecommerceHelper'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
interface ProductActionsProps {
  productId: string ;
}

const ProductActions: React.FC<ProductActionsProps> = ({ productId }) => {
  const router = useRouter()
  const [buyRequestState, setBuyRequestState] = useState(false)
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    try {
      const response = await createCartItem( productId );
      console.log('Cart item added:', response);
      toast.success('Item added to cart');
    } catch (error: any) {
      console.error('Failed to add item to cart:', error.message || error);
      toast.success('Failed to add item to cart');
    }
  };

  const requestProductPurchase = async () =>{
      try {
        setLoading(true)
        const response = await requestPurchaseProduct(productId)
        console.log(response)
        if (response.status === 201) {
          toast.success('Request to purchase product is successfully submitted')
          setBuyRequestState(true)
        }
      } catch (error) {
        toast.error('something went wrong')
      }
      setLoading(false)
  }
  return (
    <div className="flex w-full items-stretch gap-3 text-base font-semibold mt-10 ">
    <ActionButton onClick={addToCart} variant='secondary' className='border-[rgba(157,157,157,1)]! border-1! rounded-[46px]! w-full! hidden'>
    <img
        src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffde850a93dee551f7e9ff85dc780fc1235c9cf?placeholderIfAbsent=true"
        alt="Cart icon"
        className="aspect-[0.94] object-contain w-[15px] self-stretch shrink-0 my-auto"
      />
      <span className="self-stretch my-auto">Add To Cart</span>
    </ActionButton>

    {
      buyRequestState ? 
      <ActionButton variant='primary'   className='rounded-[46px]! w-full!'>
      Requested
      </ActionButton >
      :
      <ActionButton onClick={requestProductPurchase} variant='proceed' className='rounded-[46px]! w-full!'>
      {
        loading ? 
        'loading'
        :
        'Buy Now'
      }
      </ActionButton >

    }

   
  </div>
  )
}

export default ProductActions