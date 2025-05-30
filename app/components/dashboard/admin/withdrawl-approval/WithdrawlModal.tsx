import React, { useState } from 'react'
import ModalNavigation from '../navigation';
import AboutUser from '../AboutUser';
import ActionButton from '@/app/components/ui/ActionButton';
import { User, Withdrawal } from '@/app/types/models';
import { withDrawalManager } from '@/lib/admin/withdrawals/withdrawalHelper';
import { toast } from 'sonner';
import BankDetails from './BankDetails';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';

interface modelProps {
showModal: boolean
handleModalDisplay : ()=>void
data : Withdrawal
approvalStatus: string
setApprovalStatus: React.Dispatch<React.SetStateAction<string>>;
approveWithdrawal: ()=>Promise<void>
approveFuncLoading: boolean; 
rawStatus: string; 
setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
childIndex: number;
}

  const tabs = [
        { id: "user", label: "About User", },
        { id: "bankDetails", label: "User Bank Details", },
      ];


const WithdrawlModal:React.FC<modelProps> = ({showModal, handleModalDisplay, data, approvalStatus, setApprovalStatus, approveWithdrawal, approveFuncLoading, rawStatus, setFetchedData, childIndex}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false)

          const holdWithdrawal = async () =>{
            try {
              setLoading(true)
              const res = await withDrawalManager(data.id, 'HOLD');
              if (res.status === 200) {
                toast.info('User Withdrawal Hold')
                setApprovalStatus('HOLD')

               // Update the fetched data to reflect the approval status
              setFetchedData((prev: FetchedDataType): FetchedDataType => {
                      const updateArr = [...prev.withdrawals];

                      if (!updateArr[childIndex]) return prev; // optional safety guard

                      updateArr[childIndex] = {
                        ...updateArr[childIndex],
                        status: 'HOLD',
                      };

                      return {
                        ...prev,
                        withdrawals: updateArr,
                      };
                    });
              } else {
                toast.error('Some error occured')
              } 
            } catch (error) {
              toast.error('Some error occured')
            }
            setLoading(false)
          }


  return (
   <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className={` overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-screen flex backdrop-blur-[1px] ${showModal ? 'block' : 'hidden'}`} >

    <div className=" p-4  w-6xl h-[100%] flex items-center justify-center">
        {/* <!-- Modal content --> */}
        <div className=" bg-white rounded-2xl shadow-sm h-full w-6xl flex flex-col justify-between ">

            <div>
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 border-b   border-gray-200">
             <div>
            <h1 className="text-xl font-semibold mb-1">Withdrawal User Details</h1>
            <span className="text-base  ">Review the user requested for withdrawal</span>
            </div>

                <button onClick={handleModalDisplay} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="static-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="p-4  space-y-4 w-full">
            <ModalNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === 0 && <AboutUser user={data.user}/> }
            {activeTab === 1 && <BankDetails user={data.user}/> }
            
          
            </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-end p-4 gap-5 border-t border-gray-200 rounded-b w-full  ">
               {/* <ActionButton className='text-red-500! border-red-500!' variant='secondary'>Reject</ActionButton> */}
               {
                rawStatus === 'APPROVED' ? (
                  <ActionButton onClick={holdWithdrawal} variant='secondary' className='border-orange-400! text-orange-400!'>{
                loading ? <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div> : "Hold"
                }</ActionButton>
                )
                :
                        <ActionButton onClick={approveWithdrawal} className={`shadow-none! `} variant='success'>
                    { approveFuncLoading ? <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div> : "Approve" }
                   </ActionButton>
               }
            </div>
        </div>
    </div>
</div>
 
  )
}

export default WithdrawlModal