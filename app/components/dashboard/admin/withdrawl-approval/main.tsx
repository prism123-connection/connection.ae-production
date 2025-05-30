"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import KycRow from '../kyc-approvals/kycRow';
import WithdrawlRow from '../../commisions/withdrawlPayout/WithdrawlRow';
import WithdrawlTableRow from './withdrawlRow';
import { Withdrawal } from '@/app/types/models';
import { dealsManageer } from '@/lib/admin/deals/dealsHelper';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';


const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Amount Requested" },
    { header: "User Total Balance" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

type status = "PENDING" | "APPROVED" | "HOLD" | "REJECTED";

interface withdrawalProps {
  fetchedData : Withdrawal[]
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
}

const WithdrawlApproval:React.FC<withdrawalProps> = ({fetchedData, setFetchedData}) => {
    const [filterStatus, setFilterStatus] = useState('all')
    const [filteredData, setFilteredData] = useState(fetchedData);
    const user = fetchedData[0].status

      const handleStatusFilter = (status: string) => {
      setFilterStatus(status);
    
      if (status === 'APPROVED') {
        setFilteredData(fetchedData.filter(item => item.status === 'APPROVED'));
      } else if (status === 'PENDING') {
        setFilteredData(fetchedData.filter(item => item.status === 'PENDING'));
      } else if (status === 'HOLD') {
        setFilteredData(fetchedData.filter(item => item.status === 'HOLD'));
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
            <h1 className="text-2xl font-semibold mb-2">Withdrawl Requests</h1>
            <span className="text-base  mb-8">Review and manage pending payment withdraw submissions from the users</span>
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

              <ProductTable childClasses='grid-cols-[5%_30%_10%_10%_10%_15%_20%]' columns={orderColumns}>
                {filteredData && filteredData.map((order, index) => (
                    <WithdrawlTableRow 
                    childIndex={index} 
                    setFetchedData={setFetchedData} 
                    className={`grid-cols-[5%_30%_10%_10%_10%_15%_20%] 
                    ${index === filteredData.length-1 ? ' rounded-b-xl' : null}`} 
                    key={index} 
                    status={order.status} 
                    index={index} 
                    data={order} 
                    />
                ))}
                {/* {fetchedData && fetchedData.map((order, index) => (
                    <WithdrawlTableRow className={`grid-cols-[5%_30%_10%_10%_10%_15%_20%] ${index === fetchedData.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))} */}
            </ProductTable>
        </SectionHeader>
  )
}

export default WithdrawlApproval