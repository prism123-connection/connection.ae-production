"use client"
import ActionButton from "@/app/components/ui/ActionButton";
import CommonAvatar from "@/app/components/ui/CommonAvatar";
import { User } from "@/app/types/models";
import { useEffect, useState } from "react";
// import WithdrawlModal from "./WithdrawlModal";



interface RowProps {
  index: number;
  status:  "ACTIVE" | "DEACTIVATED"
  data: User;
  className? : string;
};

const UserRows = ({ index, data, className }: RowProps) => {
  const [showModal, setShowModal] = useState(false)
  const [userType, setUserType] = useState('NOT_SET');

    useEffect(() => {
      if (data.role){
        setUserType(data.role);
      }
    }, [data.role]);
  
  const handleModalDisplay = () =>{
    setShowModal(!showModal)
  }
  return (
    <>
    <div className={`grid items-center  px-6 py-3 border-b  border-[#E6E4E7] w-full ${className}  break-words whitespace-normal  text-ellipsis `}>
      <div>{String(index + 1).padStart(2, "0")}</div>
        
        <div className="flex items-center gap-3">
                <CommonAvatar userRole={data.role} firstName={data.firstName} lastName={data.lastName} avatarUrl={data.avatarUrl}/> 
               
        <div>{data.firstName}{" "}{data.lastName}</div>
        </div>

            { 
                userType === 'PAID_USER'   ?  (
              <div className="text-yellow-500 bg-yellow-500/5 px-0 py-2 border-yellow-400 border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold">{'Premium user'}</div>
              )
              : 
              <div className="text-black bg-violet-500/5 px-0 py-2 border-black border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold">{'Free user'}</div>
          
        }
         <div>{data.state}</div>
         <div>{new Date(data.createdAt).toLocaleDateString()}</div>
         <div>{data.phoneNumber}</div>
         <div>{data.email}</div>
         {/* <div>{'ACTIVE'}</div> */}

      


      {/* <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">
        <ActionButton className="py-1.5! px-8! rounded-lg!" variant="secondary">Approve</ActionButton>
        <ActionButton onClick={()=>setShowModal(!showModal)} className="py-0! px-0! border-0! underline hover:shadow-none!" variant="secondary">Know More</ActionButton>
      </div> */}
    </div>
    </>
  );
};

export default UserRows;