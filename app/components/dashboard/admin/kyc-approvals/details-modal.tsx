import React, { useState } from 'react'
import KycNavigation from '../navigation'
import EntityInformation from './entityInformation';
import ActionButton from '@/app/components/ui/ActionButton';
import ContactPerson from './contactPerson';
import OwnerInfo from './ownerInfo';
import Documents from './documents';
import LegalComplaince from './legal';
import AboutUser from '../AboutUser';
import ModalNavigation from '../navigation';
import { KycType } from '@/app/types/models';
import { kycManager } from '@/lib/admin/kyc/kycHelper';
import { toast } from 'sonner';
import { FetchedDataType } from '@/app/(user_dash)/admin/page';

interface modelProps {
showModal: boolean
handleModalDisplay : ()=>void
data : KycType
kycApproved: boolean | null
approveKyc: ()=>void
setKycApproved: React.Dispatch<React.SetStateAction<boolean | null>>;
setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
status : boolean;  
childIndex: number;
approveFuncLoading : boolean

}

  const tabs = [
        { id: "entityInformation", label: "Entity Information", },
        { id: "contact-informatino", label: "Contact Information", },
        { id: "OwnershipManagement", label: "Ownership and Management", },
        { id: "complainceAndLegal", label: "Complaince and Legal", },
        { id: "documents", label: "Documents", },
        { id: "user", label: "About User", },
      ];


const KycDetailsModel:React.FC<modelProps> = ({showModal, handleModalDisplay, data, kycApproved , approveKyc, setKycApproved, setFetchedData, childIndex, status, approveFuncLoading}) => {
    const [activeTab, setActiveTab] = useState(0);

    const [loading, setLoading] = useState(false)

        const holdKyc = async () =>{
          try {
            setLoading(true)
            const res = await kycManager(data.user.id, false)
            if (res.status === 200) {
              toast.success('User Kyc shift on hold')
              setKycApproved(false)

               // Update the fetched data to reflect the approval status
          setFetchedData((prev: FetchedDataType): FetchedDataType => {
                   const updatedKycs = [...prev.kycs];

                   if (!updatedKycs[childIndex]) return prev; // safety check

                  updatedKycs[childIndex] = {
                    ...updatedKycs[childIndex],
                    user: {
                      ...updatedKycs[childIndex].user,
                      kycDone: false,
                    },
                  };
                    return {
                        ...prev,
                        kycs: updatedKycs,
                      };
                });
            }
          } catch (error) {
            console.log(error)
            toast.error('Some error occured')
          }
          setLoading(false)
        }
  return (
   <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className={` overflow-y-scroll overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-screen flex backdrop-blur-[1px] ${showModal ? 'block' : 'hidden'}`} >

    <div className=" p-4  w-6xl h-[100%] flex items-center justify-center">
        {/* <!-- Modal content --> */}
        <div className=" bg-white rounded-2xl shadow-sm h-full w-6xl flex flex-col justify-between ">

            <div>
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 border-b   border-gray-200">
             <div>
            <h1 className="text-xl font-semibold mb-1">KYC Details</h1>
            <span className="text-base  ">Approve or hold the KYC details of the user</span>
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
            {activeTab === 0 && <EntityInformation  data={data}/> }
            {activeTab === 1 && <ContactPerson data={data}/> }
            {activeTab === 2 && <OwnerInfo data={data}/> }
            {activeTab === 3 && <LegalComplaince data={data}/> }
            {activeTab === 4 && <Documents data={data}/> }
            {activeTab === 5 && <AboutUser user={data.user}/> }
            
          
            </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-end p-4 gap-5 border-t border-gray-200 rounded-b w-full  ">

              {
                kycApproved ? 
                 <ActionButton onClick={holdKyc} variant='secondary' className='border-orange-400! text-orange-400!'>
                {
                    loading ? 
                    (
                       <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
                    )
                    :
                    (
                       'Hold' 
                    )
                }
               </ActionButton>
               : 
                <ActionButton onClick={approveKyc} className='shadow-none!' variant='success'>
                   {
                    approveFuncLoading ? 
                    (
                       <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
                    )
                    :
                    (
                       'Approve' 
                    )
                }
                </ActionButton>

              }

               {/* <ActionButton onClick={holdKyc} variant='secondary' className='border-orange-400! text-orange-400!'>
                {
                    loading ? 
                    (
                       <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
                    )
                    :
                    (
                       'Hold' 
                    )
                }
               </ActionButton>
               {
                   (!data.user.kycDone && !kycApproved)  && (
                      <ActionButton onClick={approveKyc} className='shadow-none!' variant='success'>Approve</ActionButton>
                  )
               } */}
            </div>
        </div>
    </div>
</div>
 
  )
}

export default KycDetailsModel