import React from 'react'
import SectionHeader from '../SectionHeader'
import H1 from '../ui/H1'
import Image from 'next/image'

const testimonials = [
    {
      image: '/testimonials/testimonial-user-1.png',
      quote: '“I went from local sales to international exports thanks to Connection Dubai.”',
      name: 'Rajesh P',
      country: 'India',
    },
    {
      image: '/testimonials/testimonial-user-2.png',
      quote: '“As a freelancer, I connected with global clients and tripled my income.”',
      name: 'Maria G',
      country: 'Philippines',
    },
    {
      image: '/testimonials/testimonial-user-3.png',
      quote: '“The membership card gave me access to premium networking events and genuine business leads.”',
      name: 'Fatima A',
      country: 'Saudi Arabia',
    }
  ];

function TestimonialHeader() {
  return (
    <SectionHeader classes="py-30 w-full h-[100vh] bg-black animated-bg-testimonial ">
      <H1 classes='text-white mt-96 text-4xl!'>Over 1000+ people trust us</H1>
      <span className='text-white text-lg text-center opacity-60 mt-5'>Connection gives you the blocks & components you need to create a truly professional website,<br/> landing page or admin panel for your SaaS.</span>

    <div className='flex gap-10 mt-20'>
    {
        testimonials.map((testimonial, index)=>(
        <div key={index} className='w-80 min-h-[500px] bg-gray-400 rounded-3xl flex flex-col items-start justify-end gap-2 p-5 relative overflow-hidden group '>
        <Image src={testimonial.image} className='object-cover ' fill alt='user'/>
        <span className='text-white text-base opacity-0 group-hover:opacity-60 transition-opacity duration-1000 z-10'>{testimonial.quote}</span>
        <span className='text-white text-lg font-semibold z-10'>{testimonial.name}</span>
        <span className='text-white text-lg opacity-50 z-10'>{testimonial.country}</span>
        <div className='w-full min-h-[100%]  absolute top-0 left-0 bg-gradient-to-b from-transparrent to-black/50 group-hover:to-black/100 transition-colors duration-1000'/>
    </div>
        ))
    }
    
      </div>
    </SectionHeader>
  )
}

export default TestimonialHeader