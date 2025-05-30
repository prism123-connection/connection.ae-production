import SectionHeader from '@/app/components/SectionHeader'
import TestimonialHeader from '@/app/components/testimonials/testimonialHeader'
import TestimonialReviews from '@/app/components/testimonials/testimonialReviews'
import H1 from '@/app/components/ui/H1'
import Image from 'next/image'
import React from 'react'


  

function Testimonials() {
  return (
    <>
    <TestimonialHeader/>
    <TestimonialReviews/>
    </>
  )
}

export default Testimonials