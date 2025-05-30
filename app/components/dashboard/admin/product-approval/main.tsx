"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import ProductRows from './productRow';
import { Product } from '@/app/types/models';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';




const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Product"},
    // { header: "SKUs" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

interface productApprovalProps { 
  fetchedData : Product[]
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
}


const ProductApproval:React.FC<productApprovalProps> = ({fetchedData, setFetchedData}) => {
    const [filterStatus, setFilterStatus] = useState('all')
    const [filteredData, setFilteredData] = useState(fetchedData);

      const handleStatusFilter = (status: string) => {
      setFilterStatus(status);
    
      if (status === 'APPROVED') {
        setFilteredData(fetchedData.filter(item => item.approvalStatus === 'APPROVED'));
      } else if (status === 'PENDING') {
        setFilteredData(fetchedData.filter(item => item.approvalStatus === 'PENDING'));
      } else if (status === 'HOLD') {
        setFilteredData(fetchedData.filter(item => item.approvalStatus === 'HOLD'));
      } else {
        setFilteredData(fetchedData); // show all
      }
    };
    
      React.useEffect(() => {
        handleStatusFilter(filterStatus);
      }, []);

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
                                  handleStatusFilter(value)
                                }
                                name=""
                                options={[
                                   { value: "all", label: "Show All" },
                                  { value: "PENDING", label: "Pending" },
                                  { value: "HOLD", label: "Hold" },
                                  { value: "APPROVED", label: "Approved" },
                                ]}
                              />
                            </div>
                </div>

              <ProductTable childClasses='grid-cols-[5%_20%_25%_15%_15%_20%]' columns={orderColumns}>
                {filteredData && filteredData.map((order, index) => (
                    <ProductRows 
                    childIndex={index} 
                    setFetchedData={setFetchedData} 
                    className={`grid-cols-[5%_20%_25%_15%_15%_20%] 
                    ${index === filteredData.length-1 ? ' rounded-b-xl' : null}`} 
                    key={index} 
                    status={order.approvalStatus} 
                    index={index} 
                    data={order} 
                    />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default ProductApproval