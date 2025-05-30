"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import DealRows from './dealRows';
import { Deal } from '@/app/types/models';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';




const orderColumns = [
    { header: "Sl.No." },
    { header: "Product Name" },
    { header: "Deal Amount"},
    // { header: "SKUs" },
    { header: "Buyer" },
    { header: "Seller" },
    { header: "Status" },
    { header: "Actions" },
];


interface dealApprovalProps {
  fetchedData : Deal[]
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
}

const DealApproval:React.FC<dealApprovalProps> = ({fetchedData, setFetchedData}) => {
    const [filterStatus, setFilterStatus] = useState('all')
      const [filteredData, setFilteredData] = useState(fetchedData);  

           const handleStatusFilter = (status: string) => {
            setFilterStatus(status);
          
            if (status === 'APPROVED') {
              setFilteredData(fetchedData.filter(item => item.dealStatus === 'APPROVED'));
            } else if (status === 'PENDING') {
              setFilteredData(fetchedData.filter(item => item.dealStatus === 'PENDING'));
            } else if (status === 'HOLD') {
              setFilteredData(fetchedData.filter(item => item.dealStatus === 'HOLD'));
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
            <h1 className="text-2xl font-semibold mb-2">Deal Requests</h1>
            <span className="text-base  mb-8">Review and manage pending deals submissions from the users</span>
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

              <ProductTable 
              childClasses='grid-cols-[5%_25%_10%_15%_15%_10%_20%]' 
              columns={orderColumns}>
                {filteredData && filteredData.map((order, index) => (
                    <DealRows 
                    childIndex={index} 
                    setFetchedData={setFetchedData} 
                    className={`grid-cols-[5%_25%_10%_15%_15%_10%_20%] 
                    ${index === filteredData.length-1 ? ' rounded-b-xl' : null}`} 
                    key={index} 
                    status={order.dealStatus} 
                    index={index} 
                    data={order} 
                    />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default DealApproval; 