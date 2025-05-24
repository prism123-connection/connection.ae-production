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

interface modelProps {
showModal: boolean
handleModalDisplay : ()=>void
}

  const tabs = [
        { id: "entityInformation", label: "Entity Information", },
        { id: "contact-informatino", label: "Contact Information", },
        { id: "OwnershipManagement", label: "Ownership and Management", },
        { id: "complainceAndLegal", label: "Complaince and Legal", },
        { id: "documents", label: "Documents", },
        { id: "user", label: "About User", },
      ];

const KycDetailsModel:React.FC<modelProps> = ({showModal, handleModalDisplay}) => {
    const [activeTab, setActiveTab] = useState(0);
  return (
   <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className={` overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-screen flex backdrop-blur-[1px] ${showModal ? 'block' : 'hidden'}`} >

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
            {activeTab === 0 && <EntityInformation/> }
            {activeTab === 1 && <ContactPerson/> }
            {activeTab === 2 && <OwnerInfo/> }
            {activeTab === 3 && <LegalComplaince/> }
            {activeTab === 4 && <Documents/> }
            {activeTab === 5 && <AboutUser/> }
            
          
            </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-end p-4 gap-5 border-t border-gray-200 rounded-b w-full  ">
               <ActionButton className='text-red-500! border-red-500!' variant='secondary'>Reject</ActionButton>
               <ActionButton variant='secondary' className='border-orange-400! text-orange-400!'>Hold</ActionButton>
               <ActionButton className='shadow-none!' variant='success'>Approve</ActionButton>
            </div>
        </div>
    </div>
</div>
 
  )
}

export default KycDetailsModel