"use client";
import ActionButton from "@/app/components/ui/ActionButton";
import KycDetailsModel from "./details-modal";
import { useEffect, useState } from "react";
import { KycType, User } from "@/app/types/models";
import { kycManager } from "@/lib/admin/kyc/kycHelper";
import { toast } from "sonner";
import CommonAvatar from "@/app/components/ui/CommonAvatar";
import { FetchedDataType } from "@/app/(user_dash)/admin/page";

interface RowProps {
  index: number;
  status: boolean;
  data: KycType;
  className?: string;
  setFetchedData: React.Dispatch<React.SetStateAction<FetchedDataType>>;
  childIndex: number;
}

type ApprovalStatus = "true" | "false";

const statusMap: Record<
  ApprovalStatus,
  {
    text: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  true: {
    text: "APPROVED",
    textColor: "text-green-500",
    bgColor: "bg-green-500/5",
    borderColor: "border-green-400",
  },
  false: {
    text: "PENDING",
    textColor: "text-red-500",
    bgColor: "bg-red-500/5",
    borderColor: "border-red-400",
  },
  // : {
  //   text: 'HOLD',
  //   textColor: 'text-orange-500',
  //   bgColor: 'bg-orange-500/5',
  //   borderColor: 'border-orange-400',
  // },
};

const KycRow = ({
  index,
  data,
  className,
  setFetchedData,
  childIndex,
  status,
}: RowProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalDisplay = () => {
    setShowModal(!showModal);
  };

  const [loading, setloading] = useState(false);
  const [kycApproved, setKycApproved] = useState<boolean | null>(null);

  const approveKyc = async () => {
    try {
      setloading(true);
      const res = await kycManager(data.user.id, true);
      if (res.status === 200) {
        toast.success("User Kyc Approved Successfully");
        setKycApproved(true);

        // Update the fetched data to reflect the approval status
        setFetchedData((prev: FetchedDataType): FetchedDataType => {
          const updatedKycs = [...prev.kycs];

          if (!updatedKycs[childIndex]) return prev; // safety check

          updatedKycs[childIndex] = {
            ...updatedKycs[childIndex],
            user: {
              ...updatedKycs[childIndex].user,
              kycDone: true,
            },
          };
          return {
            ...prev,
            kycs: updatedKycs,
          };
        });
      }
    } catch (error) {
      toast.error("Some error occured");
    }
    setloading(false);
  };

  useEffect(() => {
   setKycApproved(status)
  }, [status])

  return (
    <>
      <div
        className={`grid items-center  px-6 py-3 border-b  border-[#E6E4E7] w-full ${className} `}
      >
        <div>{String(index + 1).padStart(2, "0")}</div>

        <div className="flex items-center gap-3">
          <CommonAvatar
            userRole={data.user.role}
            firstName={data.user.firstName}
            lastName={data.user.lastName}
            avatarUrl={data.user.avatarUrl}
          />
          {/* {
          data.user.avatarUrl ? : <CommonAvatar userRole={data.user.role} firstName={data.user.firstName} lastName={data.user.lastName} avatarUrl={data.user.avatarUrl}/>
        }
         */}
          <div>
            {data.user.firstName} {data.user.lastName}
          </div>
        </div>

        <div>{data.typeOfEntity}</div>
        <div>{data.entityName}</div>
        <div>{new Date(data.createdAt).toLocaleDateString()}</div>
        {/* {
        !kycApproved ? 
        <div>{data.user.kycDone ? <span className="text-green-600 bg-green-500/10 px-4 py-2 border-green-400 border-[1px] rounded-sm">APPROVED</span> : 
        <span className="text-orange-500 bg-orange-500/5 px-5 py-2 border-orange-400 border-[1px] rounded-sm">PENDING</span>}
        </div>
        :
        <span className="text-green-500">APPROVED</span>
      } */}
        {kycApproved ? (
          <div>
            <span className="text-green-600 bg-green-500/10 px-4 py-2 border-green-400 border-[1px] rounded-sm">
              APPROVED
            </span>
          </div>
        ) : (
          <div>
            <span className="text-orange-500 bg-orange-500/5 px-5 py-2 border-orange-400 border-[1px] rounded-sm">
              PENDING
            </span>
          </div>
        )}

        <div className="flex gap-5 max-sm:flex-col max-sm:gap-2">
          {/* {
          (!data.user.kycDone && !kycApproved)  && (
            <ActionButton onClick={approveKyc} className="py-1.5! px-8! rounded-lg! hover:shadow-sm!" variant="secondary">
              {
                loading ? 
                 <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div> : 
                'Approve'
              }

            </ActionButton>
          )
        } */}
          {!kycApproved && (
            <ActionButton
              onClick={approveKyc}
              className="py-1.5! px-8! rounded-lg! hover:shadow-sm!"
              variant="secondary"
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-4 border-black self-center border-t-transparent rounded-full"></div>
              ) : (
                "Approve"
              )}
            </ActionButton>
          )}
          <ActionButton
            onClick={() => setShowModal(!showModal)}
            className="py-0! px-0! border-0! underline hover:shadow-none!"
            variant="secondary"
          >
            Know More
          </ActionButton>
        </div>
      </div>

      <KycDetailsModel
        childIndex={childIndex}
        setFetchedData={setFetchedData}
        status={status}
        setKycApproved={setKycApproved}
        kycApproved={kycApproved}
        approveKyc={approveKyc}
        data={data}
        showModal={showModal}
        handleModalDisplay={handleModalDisplay}
        approveFuncLoading={loading}
      />
    </>
  );
};

export default KycRow;
