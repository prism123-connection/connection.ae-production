import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Building2, MapPin, Calendar, FileText, Shield, CheckCircle } from "lucide-react";
import KeyValueDisplay from "../keyValueDisplay";
import { Deal, Product } from "@/app/types/models";
import React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

interface props {
  data : Deal
}

const AboutDeal:React.FC<props> = ({data}) => {

  return (
    <div className=" pt-4 w-full ">
   

      <div className="flex gap-4 w-full ">
        {/* Business Information Card */}

        <div className=" border-0  w-[100%] ">

          <div className="px-2 space-y-10">
            <div className="flex flex-col gap-3">
            <KeyValueDisplay label="Requested date:" value={new Date(data.createdAt).toLocaleDateString()} />
            <KeyValueDisplay label="Deal Price:" value={`$ ${(data.amount).toString()}`} />
            <KeyValueDisplay label="Quantity:" value={data.skus} />
            <KeyValueDisplay label="Deal Status (Approval by admin):" value={`${data.dealStatus}`} />
            <KeyValueDisplay label="Payment Status from buyer:" value={data.paymentStatus} />
            {/* <KeyValueDisplay label="Go Live At:" value={new Date(data.goLiveAt).toLocaleDateString()} /> */}
            </div>
          </div>
        </div>

        {/* ID Verification Card */}
        <div className="  bg-white w-[30%]">
          <div className="p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <img 
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
                  alt="Permanent Resident Card" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="mt-8 text-center hidden">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Registration Status: Active & Verified</span>
        </div>
      </div>
    </div>
  );
};

export default AboutDeal;