import ProductUploadForm from '@/app/components/dashboard/listProducts/Form'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function ListProducts() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
    <ProductUploadForm/>
    </SectionHeader>
  )
}

export default ListProducts