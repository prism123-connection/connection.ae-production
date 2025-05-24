"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import DealRows from './dealRows';




const orderColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Deal Amount"},
    { header: "SKUs" },
    { header: "Buyer" },
    { header: "Seller" },
    { header: "Status" },
    { header: "Actions" },
];

type KycStatus = "PENDING" | "APPROVED" | "HOLD" | "REJECTED";

interface Submission {
  slNo: string;
  userAvatar: string; 
  productName: string;
  dealAmount: string;
  skus: string;
  buyer: string;
  seller: string;
  status: KycStatus; 
  action: string;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Smartwatch Series 8",
    dealAmount: "$1,200",
    skus: "SW-8-BLK, SW-8-SLV",
    buyer: "Sasha Nikki",
    seller: "FitTech Ltd",
    status: 'PENDING', 
    action: "Approve"
  },
  {
    slNo: "02",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Wireless Earbuds Pro",
    dealAmount: "$900",
    skus: "EB-PRO-WHT",
    buyer: "Mehreen Khan",
    seller: "AudioMax Inc",
    status: 'PENDING', 
    action: "Approve"
  },
  {
    slNo: "03",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Portable Projector X10",
    dealAmount: "$3,500",
    skus: "PJ-X10-BLK",
    buyer: "Sara",
    seller: "VisionWorks",
    status: 'PENDING', 
    action: "Approve"
  },
  {
    slNo: "04",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Fitness Tracker FitX",
    dealAmount: "$2,000",
    skus: "FT-FX-BLU",
    buyer: "Anjali",
    seller: "HealthZone",
    status: 'PENDING', 
    action: "Approve"
  },
  {
    slNo: "05",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Bluetooth Speaker Boom",
    dealAmount: "$4,750",
    skus: "BS-BM-BLK, BS-BM-GRY",
    buyer: "Penny",
    seller: "SoundCrate",
    status: 'PENDING', 
    action: "Approve"
  },
  {
    slNo: "06",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    productName: "Home Security Camera HD",
    dealAmount: "$5,100",
    skus: "SC-HD-360",
    buyer: "Elizabeth",
    seller: "SafeHome Co.",
    status: 'PENDING', 
    action: "Approve"
  }
];



const DealApproval = () => {
    const [filterStatus, setFilterStatus] = useState('all')
  return (
  <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>
            <div>
            <h1 className="text-2xl font-semibold mb-2">Deal Requests</h1>
            <span className="text-base  mb-8">Review and manage pending deals submissions from the users</span>
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

              <ProductTable childClasses='grid-cols-[5%_25%_10%_10%_10%_10%_10%_20%]' columns={orderColumns}>
                {submissions.map((order, index) => (
                    <DealRows className={`grid-cols-[5%_25%_10%_10%_10%_10%_10%_20%] ${index === submissions.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default DealApproval; 