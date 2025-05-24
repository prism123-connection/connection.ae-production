"use client"
import AdminNavigation from '@/app/components/dashboard/admin/adminNavigation'
import AdminSection from '@/app/components/dashboard/admin/adminSection'
import DealApproval from '@/app/components/dashboard/admin/deal-approval/main'
import KycApprovals from '@/app/components/dashboard/admin/kyc-approvals/main'
import ProductApproval from '@/app/components/dashboard/admin/product-approval/main'
import TransactionsList from '@/app/components/dashboard/admin/transactions/main'
import UserManagement from '@/app/components/dashboard/admin/user-management/main'
import WithdrawlApproval from '@/app/components/dashboard/admin/withdrawl-approval/main'
import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'

function Admin() {
    const [activeTab, setActiveTab] = useState(0);
  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
        <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
         {activeTab === 0 && (<AdminSection/>)}
         {activeTab === 1 && (<KycApprovals/>)}
         {activeTab === 2 && (<WithdrawlApproval/>)}
         {activeTab === 3 && (<ProductApproval/>)}
         {activeTab === 4 && (<DealApproval/>)}
         {activeTab === 5 && (<UserManagement/>)}
         {activeTab === 6 && (<TransactionsList/>)}

        
    </SectionHeader>
  )
}

export default Admin