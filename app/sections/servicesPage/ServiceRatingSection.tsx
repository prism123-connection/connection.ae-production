import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image'
import React from 'react'

function ServiceRatingSection() {
  return (
    <SectionHeader classes=" items-start px-20 pb-20 -mt-70! ">
    <div className='w-full flex justify-between'>
    {/* Rating section */}
    <div  className='flex flex-col items-start mt-80 '>
    <Image src={'/services/rating-stars.svg'} alt='rating' width={100} height={50} className='mb-5' />
    <H1 classes='font-normal text-lg!'>A total game changer!</H1>
    <span className='text-base mt-5  text-[#001625]/60'>With Connection Dubai, I expanded my trading business <br/> internationally without needing a license. It's a<br/>game-changer!"</span>

    <div className='flex gap-5 items-center justify-center mt-5'>
    <Image src={'/services/rating-person.svg'} alt='rating-person-image' width={25} height={25}/>
    <H1 classes='font-bold! text-lg! '>Ahmed K, UAE</H1></div>
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