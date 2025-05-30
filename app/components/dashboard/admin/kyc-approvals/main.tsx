import SectionHeader from '@/app/components/SectionHeader'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import ProductRow from '../../seller-portal/ProductRow';
import KycRow from './kycRow';
import CustomSelect from '@/app/components/ui/CustomSelect';
import { KycType } from '@/app/types/models';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';

interface kycApprovalsProps {
  fetchedData : KycType[]
    setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
}


const orderColumns = [
    { header: "Sl.No." },
    { header: "User" },
    { header: "Type" },
    { header: "Entity name" },
    { header: "Date submitted" },
    { header: "status" },
    { header: "Actions" },
];

const KycApprovals:React.FC<kycApprovalsProps> = ({fetchedData ,setFetchedData}) => {



const [filterStatus, setFilterStatus] = useState('all')
const [filteredData, setFilteredData] = useState(fetchedData);

  const handleStatusFilter = (status: string) => {
  setFilterStatus(status);

  if (status === 'APPROVED') {
    setFilteredData(fetchedData.filter(item => item.user.kycDone === true));
  } else if (status === 'PENDING') {
    setFilteredData(fetchedData.filter(item => item.user.kycDone === false));
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
            <h1 className="text-2xl font-semibold mb-2">KYC verification</h1>
            <span className="text-base  mb-8">Review and manage pending KYC submissions from the users</span>
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
                                  { value: "APPROVED", label: "Approved" },
                                ]}
                           
                              />
                            </div>
                </div>

              <ProductTable childClasses='grid-cols-[5%_20%_10%_25%_10%_10%_20%]' columns={orderColumns}>
                {filteredData && filteredData.map((order, index) => (
                    <KycRow 
                    childIndex={index} 
                    setFetchedData={setFetchedData} 
                    className={`grid-cols-[5%_20%_10%_25%_10%_10%_20%] 
                    ${index === filteredData.length-1 ? ' rounded-b-xl' : null}`} 
                    key={index} 
                    status={order.user.kycDone} 
                    index={index} 
                    data={order} 
                    />
                ))}
                {/* {fetchedData && fetchedData.map((order, index) => (
                    <KycRow className={`grid-cols-[5%_20%_10%_25%_10%_10%_20%] ${index === fetchedData.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.user.kycDone} index={index} data={order} />
                ))} */}
            </ProductTable>
        </SectionHeader>
  )
}

export default KycApprovals