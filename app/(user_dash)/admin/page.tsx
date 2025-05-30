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
import { Deal, KycType, Product, Transaction, User, Withdrawal } from '@/app/types/models'
import { useUser } from '@/context/UserContext'
import { getAllDealsListed } from '@/lib/admin/deals/dealsHelper'
import { getAllKyclist } from '@/lib/admin/kyc/kycHelper'
import { getAllProductsListed } from '@/lib/admin/products/productHelper'
import { getAllTransactions } from '@/lib/admin/transactions-management/helper'
import { getAllUsersListed } from '@/lib/admin/user-management/helper'
import { getAllWithdrawalRequested } from '@/lib/admin/withdrawals/withdrawalHelper'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export type FetchedDataType = {
  deals: Deal[];
  kycs: KycType[];
  products: Product[];
  withdrawals: Withdrawal[];
  transactions: Transaction[];
  users: User[];
};

function Admin() {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState<FetchedDataType>({
      deals : [], 
      kycs : [], 
      products : [], 
      withdrawals : [], 
      transactions : [], 
      users : []
    })
    const [renderView, setRenderView] = useState(false)
    const { user } = useUser();

      const fetchAllData = async () => {
        setLoading(true);
        try {
          const [deal, kyc, product, withdrawal, user, transaction] = await Promise.all([
            getAllDealsListed(),
            getAllKyclist(),
            getAllProductsListed(),
            getAllWithdrawalRequested(), 
            getAllUsersListed(), 
            getAllTransactions()
          ]);

          setFetchedData({
            deals: deal,
            kycs: kyc,
            products: product,
            withdrawals: withdrawal, 
            users : user, 
            transactions : transaction
          });
        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
          toast.error("Failed to load dashboard data. Please try again later.");
        } finally {
          setLoading(false);
          setRenderView(true)
        }
      };

      useEffect(() => {
        fetchAllData()
      }, [])
      
      const allowedRoles = ['ADMIN', 'SUPER_ADMIN'] as const;
      type UserRole = (typeof allowedRoles)[number];

        const validatedRole = allowedRoles.includes(user?.userRole as UserRole)
          ? (user?.userRole as UserRole)
          : 'ADMIN';

  return (
    <SectionHeader classes='min-h-screen! w-full! items-start justify-start gap-5! mt-0!'>
        <AdminNavigation userRole={validatedRole} activeTab={activeTab} setActiveTab={setActiveTab}/>
         {activeTab === 0 && (<AdminSection setFetchedData={setFetchedData} tranactions={fetchedData.transactions} deals={fetchedData.deals} members={fetchedData.users} name={user?.firstName} renderView={renderView}/>)}
         {activeTab === 1 && (<KycApprovals setFetchedData={setFetchedData}  fetchedData={fetchedData.kycs} />)}
         {activeTab === 2 && (<ProductApproval setFetchedData={setFetchedData} fetchedData={fetchedData.products} />)}
         {activeTab === 3 && (<DealApproval setFetchedData={setFetchedData} fetchedData={fetchedData.deals} />)}
         {activeTab === 4 && (<UserManagement fetchedData={fetchedData.users} />)}
         {activeTab === 5 && (<TransactionsList fetchedData={fetchedData.transactions} />)}
         {activeTab === 6 && (<WithdrawlApproval setFetchedData={setFetchedData} fetchedData={fetchedData.withdrawals} />)}

        
    </SectionHeader>
  )
}

export default Admin