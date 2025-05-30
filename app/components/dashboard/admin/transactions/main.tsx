"use client"
import SectionHeader from '@/app/components/SectionHeader'
import CustomSelect from '@/app/components/ui/CustomSelect'
import React, { useState } from 'react'
import ProductTable from '../../seller-portal/ProductTable';
import TransactionRows from './transactionRows';
import { Transaction } from '@/app/types/models';




const orderColumns = [
    { header: "Sl.No." },
    { header: "User Transferred" },
    { header: "Type"},
    { header: "Amount" },
    { header: "Currency" },
    { header: "Status" },
    { header: "Date" },
];

type KycStatus = "PENDING" | "APPROVED" | "HOLD" | "REJECTED";
type TransactionType = "PAYOUT" | "SUBSCRIPTION" | "DEAL";

interface Submission {
  slNo: string;
  userTransferred: string;
  userAvatar: string;
  type: TransactionType;
  amount: string;
  currency: string;
  status: KycStatus;
  date: string;
}

const submissions: Submission[] = [
  {
    slNo: "01",
    userTransferred: "Sasha Nikki",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "DEAL",
    amount: "1200",
    currency: "USD",
    status: "APPROVED",
    date: "2025-05-10",
  },
  {
    slNo: "02",
    userTransferred: "Mehreen Khan",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "PAYOUT",
    amount: "900",
    currency: "USD",
    status: "PENDING",
    date: "2025-05-11",
  },
  {
    slNo: "03",
    userTransferred: "Sara",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "SUBSCRIPTION",
    amount: "3500",
    currency: "USD",
    status: "HOLD",
    date: "2025-05-12",
  },
  {
    slNo: "04",
    userTransferred: "Anjali",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "DEAL",
    amount: "2000",
    currency: "USD",
    status: "REJECTED",
    date: "2025-05-13",
  },
  {
    slNo: "05",
    userTransferred: "Penny",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "PAYOUT",
    amount: "4750",
    currency: "USD",
    status: "APPROVED",
    date: "2025-05-14",
  },
  {
    slNo: "06",
    userTransferred: "Elizabeth",
    userAvatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    type: "DEAL",
    amount: "5100",
    currency: "USD",
    status: "PENDING",
    date: "2025-05-15",
  },
];

interface transactionListProps {
  fetchedData : Transaction[]
}

const TransactionsList:React.FC<transactionListProps> = ({fetchedData}) => {
    const [filterStatus, setFilterStatus] = useState('all')
    const [filteredData, setFilteredData] = useState(fetchedData);

      const handleStatusFilter = (status: string) => {
      setFilterStatus(status);
    
      if (status === 'subscription') {
        setFilteredData(fetchedData.filter(item => item.type === 'SUBSCRIPTION' ));
      } else if (status === 'deals') {
        setFilteredData(fetchedData.filter(item => item.type === 'DEAL'));
      }else if (status === 'payouts') {
        setFilteredData(fetchedData.filter(item => item.type === 'PAYOUT'));
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
            <h1 className="text-2xl font-semibold mb-2">Transaction Lists</h1>
            <span className="text-base  mb-8">Review all payment occured on connection platform</span>
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
                                  { value: "subscription", label: "Subcription" },
                                  { value: "deals", label: "Deals" },
                                  { value: "payouts", label: "Payouts" },
                                ]}
                              />
                            </div>
                </div>

              <ProductTable childClasses='grid-cols-[5%_30%_25%_10%_10%_10%_10%]' columns={orderColumns}>
                {filteredData && filteredData.map((order, index) => (
                    <TransactionRows className={`grid-cols-[5%_30%_25%_10%_10%_10%_10%] ${index === filteredData.length-1 ? ' rounded-b-xl' : null}`} key={index} status={order.status} index={index} data={order} />
                ))}
            </ProductTable>
        </SectionHeader>
  )
}

export default TransactionsList; 