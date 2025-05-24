"use client"
import ActionButton from "@/app/components/ui/ActionButton";
import { useState } from "react";
// import WithdrawlModal from "./WithdrawlModal";



interface RowProps {
  index: number;
  status:  "ACTIVE" | "DEACTIVATED"
  data: any;
  className? : string;
};

const UserRows = ({ index, data, className }: RowProps) => {
  const [showModal, setShowModal] = useState(false)
  
  const handleModalDisplay = () =>{
    setShowModal(!showModal)
  }
  return (
    <>
    <div className={`grid items-center  px-6 py-3 border-b  border-[#E6E4E7] w-full ${className} `}>
      <div>{String(index + 1).padStart(2, "0")}</div>
        
        <div className="flex items-center gap-3">
        <img src={data.userAvatar} alt={data.userAvatar} className="w-10 h-10" />
        <div>{data.user}</div>
        </div>

         <div>{data.type}</div>
         <div>{data.country}</div>
         <div>{data.dateJoined}</div>
         <div>{data.contactNumber}</div>
         <div>{data.email}</div>
         <div>{data.status}</div>

      


      {/* <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">
        <ActionButton className="py-1.5! px-8! rounded-lg!" variant="secondary">Approve</ActionButton>
        <ActionButton onClick={()=>setShowModal(!showModal)} className="py-0! px-0! border-0! underline hover:shadow-none!" variant="secondary">Know More</ActionButton>
      </div> */}
    </div>
    </>
  );
};

export default UserRows;