import SectionHeader from '@/app/components/SectionHeader'
import RatingCarousels from '@/app/components/services/rating_carousel'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image'
import React from 'react'

function ServiceRatingSection() {
  return (
    <SectionHeader classes=" items-start px-20 pb-20 -mt-70! ">
    <div className='w-full flex justify-between'>
    
    {/* Rating section */}
    <div  className='flex flex-col items-start mt-80 '>
    <RatingCarousels/>
    </div>

    {/* Orders illustration */}
    <div>
    <Image src={'/services/your-orders-illustration.svg'} width={500} height={500} alt='orders-illustraiton'/>
    </div>
    </div>

</SectionHeader>
  )
}

export default ServiceRatingSection