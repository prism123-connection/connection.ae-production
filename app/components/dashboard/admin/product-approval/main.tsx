"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import ProductRows from './productRow';



const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Product"},
    { header: "SKUs" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

type KycStatus = "PENDING" | "APPROVED" | "HOLD" | "REJECTED";

interface Submission {
  slNo: string;
  user: string;
  userAvatar: string;
  product: string;
  skus: string;
  createdAt: string;
  status: KycStatus;
  action: string;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    user: "Sasha Nikki",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Smartwatch Series 8",
    skus: "SW-8-BLK, SW-8-SLV",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "02",
    user: "Mehreen Khan",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Wireless Earbuds Pro",
    skus: "EB-PRO-WHT",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "03",
    user: "Sara",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Portable Projector X10",
    skus: "PJ-X10-BLK",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "04",
    user: "Anjali",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Fitness Tracker FitX",
    skus: "FT-FX-BLU",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "05",
    user: "Penny",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Bluetooth Speaker Boom",
    skus: "BS-BM-BLK, BS-BM-GRY",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "06",
    user: "Elizabeth",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    product: "Home Security Camera HD",
    skus: "SC-HD-360",
    createdAt: "2025-05-01",
    status: "PENDING",
    action: "Approve"
  }
];


const ProductApproval = () => {
    const [filterStatus, setFilterStatus] = useState('all')
  return (
  <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>
            <div>
            <h1 className="text-2xl font-semibold mb-2">Product Requests</h1>
            <span className="text-base  mb-8">Review and manage pending payment product submissions from the users</span>
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

              <ProductTable childClasses='grid-cols-[5%_20%_25%_10%_10%_10%_20%]' columns={orderColumns}>
                {submissions.map((order, index) => (
                    <ProductRows className={`grid-cols-[5%_20%_25%_10%_10%_10%_20%] ${index === submissions.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default ProductApproval