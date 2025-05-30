"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import UserRows from './userRows';
import { User } from '@/app/types/models';



const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Type"},
    { header: "Country" },
    { header: "Date Joined" },
    { header: "Contact Number" },
    { header: "Email" },
    // { header: "Status" },
];

interface userManagementProps {
  fetchedData : User[]
}

const UserManagement:React.FC<userManagementProps> = ({fetchedData}) => {
    const [filterStatus, setFilterStatus] = useState('all')
  return (
  <SectionHeader classes=' w-full! items-start justify-start  rounded-md '>
            
            <div className='flex w-full items-center justify-between pr-10 mb-10'>
            <div>
            <h1 className="text-2xl font-semibold mb-2">View All Users</h1>
            {/* <span className="text-base  mb-8">Review and manage pending payment withdraw submissions from the users</span> */}
            </div>

               {/* <div className="flex flex-col w-fit items-start mb-1">
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
                            </div> */}
                </div>

              <ProductTable childClasses='grid-cols-[7%_23%_15%_15%_10%_10%_20%]' columns={orderColumns}>
                {fetchedData && fetchedData.map((order, index) => (
                    <UserRows className={`grid-cols-[7%_23%_15%_15%_10%_10%_20%] ${index === fetchedData.length-1 ? ' rounded-b-xl' : null}`} key={index} status={'ACTIVE'} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default UserManagement; 