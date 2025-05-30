import React, { useState } from 'react'
import ModalNavigation from '../navigation';
import AboutUser from '../AboutUser';
import ActionButton from '@/app/components/ui/ActionButton';
import AboutProduct from '../product-approval/aboutProduct';
import { Deal } from '@/app/types/models';
import { productManager } from '@/lib/admin/products/productHelper';
import { dealsManageer } from '@/lib/admin/deals/dealsHelper';
import { toast } from 'sonner';
import AboutDeal from './aboutDeal';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';


interface modelProps {
showModal: boolean
handleModalDisplay : ()=>void
data : Deal
approvalStatus: string
setApprovalStatus: React.Dispatch<React.SetStateAction<string>>;
approveDeal: ()=>Promise<void>
approveFuncLoading: boolean; 
rawStatus: string; 
setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
childIndex: number;
}

  const tabs = [
    { id: "user", label: "About Deal", },
      { id: "product", label: "Product Information", },
        { id: "user", label: "About Seller", },
        { id: "user", label: "About Buyer", },
      ];


const DealModal:React.FC<modelProps> = ({showModal, handleModalDisplay, data, approvalStatus, setApprovalStatus, approveDeal, approveFuncLoading, rawStatus, setFetchedData, childIndex}) => {
    const [activeTab, setActiveTab] = useState(0);
            const [loading, setLoading] = useState(false)
    
              const holdDeal = async () =>{
                try {
                  setLoading(true)
                  const res = await dealsManageer(data.id , 'HOLD', data.productId);
                  if (res.status === 200) {
                    toast.info('User Withdrawal Hold')
                    setApprovalStatus('HOLD')

                     // Update the fetched data to reflect the approval status
              setFetchedData((prev: FetchedDataType): FetchedDataType => {
                      const updateArr = [...prev.deals];

                      if (!updateArr[childIndex]) return prev; // optional safety guard

                      updateArr[childIndex] = {
                        ...updateArr[childIndex],
                        dealStatus: 'HOLD',
                      };

                      return {
                        ...prev,
                        deals: updateArr,
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
            <h1 className="text-xl font-semibold mb-1">Deal Details</h1>
            <span className="text-base  ">Approve or hold the Deals of the user</span>
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
            {activeTab === 0 && <AboutDeal data={data}/> }
            {activeTab === 1 && <AboutProduct data={data.product}/> }
            {activeTab === 2 && <AboutUser user={data.seller}/> }
            {activeTab === 3 && <AboutUser user={data.buyer}/> }
            
            
          
            </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-end p-4 gap-5 border-t border-gray-200 rounded-b w-full  ">
            
             {
                rawStatus === 'APPROVED' ? (
                  <ActionButton onClick={holdDeal} variant='secondary' className='border-orange-400! text-orange-400!'>{
                loading ? <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div> : "Hold"
                }</ActionButton>
                )
                :
                        <ActionButton onClick={approveDeal} className={`shadow-none! `} variant='success'>
                    { approveFuncLoading ? <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div> : "Approve" }
                   </ActionButton>
               }
            </div>
        </div>
    </div>
</div>
 
  )
}

export default DealModal;  