"use client"
import AdminNavigation from '@/app/components/dashboard/admin/adminNavigation'
import AdminSection from '@/app/components/dashboard/admin/adminSection'
import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'

function Admin() {
    const [activeTab, setActiveTab] = useState(0);
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
        <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
        <AdminSection/>
    </SectionHeader>
  )
}

export default Admin