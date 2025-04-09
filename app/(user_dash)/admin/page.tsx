import AdminSection from '@/app/components/dashboard/admin/adminSection'
import SectionHeader from '@/app/components/SectionHeader'
import React from 'react'

function Admin() {
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
        <AdminSection/>
    </SectionHeader>
  )
}

export default Admin