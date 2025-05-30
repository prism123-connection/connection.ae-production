"use client"
import ActionButton from "@/app/components/ui/ActionButton";
import { useEffect, useState } from "react";
import ProductModal from "./productModal";
import { Product } from "@/app/types/models";
import { productManager } from "@/lib/admin/products/productHelper";
import { toast } from "sonner";
import CommonAvatar from "@/app/components/ui/CommonAvatar";
import { FetchedDataType } from "@/app/(user_dash)/admin/page";
// import WithdrawlModal from "./WithdrawlModal";

interface RowProps {
  index: number;
  status:  "PENDING" | "APPROVED" | "HOLD" | "REJECTED"; 
  data: Product;
  className? : string;
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
  childIndex: number; 
};

type ApprovalStatus = 'APPROVED' | 'PENDING' | 'HOLD';

const statusMap: Record<ApprovalStatus, {
  text: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
}> = {
  APPROVED: {
    text: 'APPROVED',
    textColor: 'text-green-500',
    bgColor: 'bg-green-500/5',
    borderColor: 'border-green-400',
  },
  PENDING: {
    text: 'PENDING',
    textColor: 'text-red-500',
    bgColor: 'bg-red-500/5',
    borderColor: 'border-red-400',
  },
  HOLD: {
    text: 'HOLD',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-400',
  },
};

const ProductRows = ({ index, data, className , setFetchedData, childIndex}: RowProps) => {
  const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [approvalStatus, setApprovalStatus] = useState("NOT_SET");

    const rawStatus = approvalStatus === 'NOT_SET' ? data.approvalStatus : approvalStatus;

// Add a type guard to ensure it's one of the keys
const isValidStatus = (status: any): status is ApprovalStatus =>
  ['APPROVED', 'PENDING', 'HOLD'].includes(status);

const statusInfo = isValidStatus(rawStatus) ? statusMap[rawStatus] : null;

  
  const handleModalDisplay = () =>{
    setShowModal(!showModal)
  }

  const approveProduct = async () => {
     try {
          setLoading(true)
          const res = await productManager(data.id, 'APPROVED');
          if (res.status === 200) {
            toast.success('User Kyc Approved Successfully')
            setApprovalStatus('APPROVED')

            // Update the fetched data to reflect the approval status
              setFetchedData((prev: FetchedDataType): FetchedDataType => {
                      const updatedProducts = [...prev.products];

                      if (!updatedProducts[childIndex]) return prev; // optional safety guard

                      updatedProducts[childIndex] = {
                        ...updatedProducts[childIndex],
                        approvalStatus: 'APPROVED',
                      };

                      return {
                        ...prev,
                        products: updatedProducts,
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
    <>
    <div className={`grid items-center  px-6 py-3 border-b  border-[#E6E4E7] w-full ${className} `}>
      <div>{String(index + 1).padStart(2, "0")}</div>

      <div className="flex items-center gap-3">
       <CommonAvatar userRole={data.user.role} firstName={data.user.firstName} lastName={data.user.lastName} avatarUrl={data.user.avatarUrl}/> 
        
        <div>{data.user.firstName}{" "} {data.user.lastName}</div>
      </div>

      <div>{data.name}</div>
      {/* <div>{data.}</div> */}
      <div>{new Date (data.createdAt).toLocaleDateString()}</div>

          {statusInfo && (
          <div
            className={`${statusInfo.textColor} ${statusInfo.bgColor} px-0 py-2 ${statusInfo.borderColor} border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold`}
          >
            {statusInfo.text}
          </div>
        )}

      <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">

        {
          (rawStatus !== 'APPROVED') && (
        <ActionButton onClick={approveProduct} className={`py-1.5! px-8! rounded-lg! hover:shadow-sm! `} variant="secondary">{
              loading ?  <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>  : "Approve"
            }</ActionButton>
          )
        }

        <ActionButton onClick={()=>setShowModal(!showModal)} className="py-0! px-0! border-0! underline hover:shadow-none!" variant="secondary">Know More</ActionButton>
      </div>
    </div>

    <ProductModal 
    childIndex={childIndex}
    setFetchedData={setFetchedData} 
    rawStatus={rawStatus} 
    approveFuncLoading={loading} 
    approveProduct={approveProduct}
    approvalStatus={approvalStatus} 
    setApprovalStatus={setApprovalStatus}
    data={data} 
    showModal={showModal} 
    handleModalDisplay={handleModalDisplay}
    />
    </>
  );
};

export default ProductRows;