"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import UserRows from './userRows';



const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Type"},
    { header: "Country" },
    { header: "Date Joined" },
    { header: "Contact Number" },
    { header: "Email" },
    { header: "Status" },
];

type KycStatus = "ACTIVE" | "DEACTIVATED"

interface Submission {
  slNo: string;
  user: string;
  userAvatar: string;
  type: string;
  country: string;
  dateJoined: string;
  contactNumber: string;
  email: string;
  status: KycStatus;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    user: "Sasha Nikki",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "INDIVIDUAL",
    country: "United States",
    dateJoined: "2025-01-15",
    contactNumber: "+1-555-1111",
    email: "sasha.nikki@example.com",
    status: "ACTIVE",
  },
  {
    slNo: "02",
    user: "Mehreen Khan",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "BUSINESS",
    country: "United Arab Emirates",
    dateJoined: "2024-12-12",
    contactNumber: "+971-55-2345678",
    email: "mehreen.k@example.com",
    status: "ACTIVE",
  },
  {
    slNo: "03",
    user: "Sara",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "INDIVIDUAL",
    country: "Canada",
    dateJoined: "2025-02-20",
    contactNumber: "+1-647-999-1234",
    email: "sara@example.ca",
    status: "ACTIVE",
  },
  {
    slNo: "04",
    user: "Anjali",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "BUSINESS",
    country: "India",
    dateJoined: "2024-11-05",
    contactNumber: "+91-98765-43210",
    email: "anjali.biz@example.in",
    status: "ACTIVE",
  },
  {
    slNo: "05",
    user: "Penny",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "INDIVIDUAL",
    country: "Australia",
    dateJoined: "2025-03-08",
    contactNumber: "+61-412-345-678",
    email: "penny.aussie@example.au",
    status: "ACTIVE",
  },
  {
    slNo: "06",
    user: "Elizabeth",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "BUSINESS",
    country: "United Kingdom",
    dateJoined: "2024-10-18",
    contactNumber: "+44-7700-900123",
    email: "elizabeth@ukbiz.co.uk",
    status: "ACTIVE",
  },
];



const UserManagement = () => {
    const [filterStatus, setFilterStatus] = useState('all')
  return (
  <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>
            <div>
            <h1 className="text-2xl font-semibold mb-2">View All Users</h1>
            {/* <span className="text-base  mb-8">Review and manage pending payment withdraw submissions from the users</span> */}
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

              <ProductTable childClasses='grid-cols-[5%_25%_10%_10%_10%_10%_25%_5%]' columns={orderColumns}>
                {submissions.map((order, index) => (
                    <UserRows className={`grid-cols-[5%_25%_10%_10%_10%_10%_25%_5%] ${index === submissions.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default UserManagement; 