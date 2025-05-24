"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import KycRow from '../kyc-approvals/kycRow';
import WithdrawlRow from '../../commisions/withdrawlPayout/WithdrawlRow';
import WithdrawlTableRow from './withdrawlRow';


const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Amount Requested" },
    { header: "User Total Balance" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

type KycStatus = "PENDING" | "APPROVED" | "HOLD" | "REJECTED";

interface Submission {
  slNo: string;
  user: string;
  userAvatar: string;
  amount: string;
  walletBalance: string;
  createdAt: string;
  status: KycStatus;
  action: string;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    user: "Sasha Nikki",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$1,200",
    walletBalance: "$5,000",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "02",
    user: "Mehreen Khan",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$900",
    walletBalance: "$4,200",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "03",
    user: "Sara",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$3,500",
    walletBalance: "$6,100",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "04",
    user: "Anjali",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$2,000",
    walletBalance: "$2,800",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "05",
    user: "Penny",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$4,750",
    walletBalance: "$8,300",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "06",
    user: "Elizabeth",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    amount: "$5,100",
    walletBalance: "$9,700",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  }
];

const WithdrawlApproval = () => {
    const [filterStatus, setFilterStatus] = useState('all')
  return (
  <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>
            <div>
            <h1 className="text-2xl font-semibold mb-2">Withdrawl Requests</h1>
            <span className="text-base  mb-8">Review and manage pending payment withdraw submissions from the users</span>
            </div>

               <div className="flex flex-col w-fit items-start mb-1">
                              <CustomSelect
                                className='bg-white! px-5 '
                                value={filterStatus}
                                onValueChange={(value) =>
                                  setFilterStatus(value)
                                }
                                name=""
                                options={[
                                  { value: "all", label: "Show All" },
                                  { value: "pending", label: "Pending" },
                                  { value: "hold", label: "Hold" },
                                  { value: "rejected", label: "Rejected" },
                                  { value: "approved", label: "Approved" },
                                ]}
                                placeholder="select filter"
                              />
                            </div>
                </div>

              <ProductTable childClasses='grid-cols-[5%_20%_10%_25%_10%_10%_20%]' columns={orderColumns}>
                {submissions.map((order, index) => (
                    <WithdrawlTableRow className={`grid-cols-[5%_20%_10%_25%_10%_10%_20%] ${index === submissions.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default WithdrawlApproval