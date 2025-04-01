import ActionButton from '@/app/components/ui/ActionButton'
import React from 'react'

function ProductActions() {
  return (
    <div className="flex w-full items-stretch gap-3 text-base font-semibold mt-10 pr-20">
    <ActionButton variant='secondary' className='border-[rgba(157,157,157,1)]! border-1! rounded-[46px]! w-full!'>
    <img
        src="https://cdn.builder.io/api/v1/image/assets/296ac88e169e49cda1179c6a01f4bc83/7ffde850a93dee551f7e9ff85dc780fc1235c9cf?placeholderIfAbsent=true"
        alt="Cart icon"
        className="aspect-[0.94] object-contain w-[15px] self-stretch shrink-0 my-auto"
      />
      <span className="self-stretch my-auto">Add To Cart</span>
    </ActionButton>
    <ActionButton variant='proceed' className='rounded-[46px]! w-full!'>
    Join the live
    </ActionButton >
   
  </div>
  )
}

export default ProductActions