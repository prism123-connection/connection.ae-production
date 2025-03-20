import SectionHeader from '@/app/components/SectionHeader'
import H1 from '@/app/components/ui/H1'
import PrimaryButtons from '@/app/components/ui/PrimaryButtons'
import ServicePageHeader from '@/app/sections/servicesPage/ServicePageHeader'
import ServicePonters from '@/app/sections/servicesPage/ServicePonters'
import ServiceRatingSection from '@/app/sections/servicesPage/ServiceRatingSection'
import ServicesSteps from '@/app/sections/servicesPage/ServicesSteps'
import React from 'react'

function ServicesPage() {
  return (
<>
<ServicePageHeader/>
<ServiceRatingSection/>
<ServicePonters/>
<ServicesSteps/>
</>
  )
}

export default ServicesPage