import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import ProductRow from '../../seller-portal/ProductRow';
import KycRow from './kycRow';
import CustomSelect from '@/app/components/ui/CustomSelect';

const KycApprovals = () => {

type KycStatus = "PENDING" | "APPROVED" | "HOLD" | "REJECTED"

interface Submission {
  slNo: string;
  user: string;
  userAvatar: string;
  type: string;
  entityName: string;
  dateSubmitted: string;
  status: KycStatus;
  action: string;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    user: "Sasha Nikki",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Entity",
    entityName: "JS Ventures",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "02",
    user: "Mehreen Khan",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Entity",
    entityName: "RB Enterprises",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "03",
    user: "Sara",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Entity",
    entityName: "Green Solutions LLC",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "04",
    user: "Anjali",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Individual",
    entityName: "-",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "05",
    user: "Penny",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Entity",
    entityName: "White services",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  },
  {
    slNo: "06",
    user: "Elizabeth",
    userAvatar: 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg',
    type: "Entity",
    entityName: "DJ Holdings",
    dateSubmitted: "01/05/2025",
    status: "PENDING",
    action: "Approve"
  }
];


const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Type" },
    { header: "Entity name" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

const [filterStatus, setFilterStatus] = useState('all')

  return (
        <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>

            <div>
            <h1 className="text-2xl font-semibold mb-2">KYC verification</h1>
            <span className="text-base  mb-8">Review and manage pending KYC submissions from the users</span>
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
                    <KycRow className={`grid-cols-[5%_20%_10%_25%_10%_10%_20%] ${index === submissions.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default KycApprovals