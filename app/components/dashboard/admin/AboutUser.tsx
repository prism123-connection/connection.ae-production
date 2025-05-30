import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Building2, MapPin, Calendar, FileText, Shield, CheckCircle } from "lucide-react";
import KeyValueDisplay from "./keyValueDisplay";
import { KycType, User } from "@/app/types/models";

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
  user : User
}


const AboutUser :React.FC<props>  = ({user})=>  {
  return (
    <div className=" pt-4 w-full ">
   

      <div className="flex gap-4 w-full ">
        {/* Business Information Card */}

        <div className=" border-0  w-[100%] ">

          <div className="px-2 space-y-10">
            <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
            <KeyValueDisplay label="First Name:" value={user.firstName} />
            <KeyValueDisplay label="Last Name:" value={user.lastName} />
            <KeyValueDisplay label="Email:" value={user.email} />
            <KeyValueDisplay label="Referral ID:" value={user.referralId} />
            <KeyValueDisplay label="Created At:" value={new Date(user.createdAt).toLocaleDateString()} />
            <KeyValueDisplay label="Wallet Balance:" value={`$${user.walletBalance.toFixed(2)}`} />
            <KeyValueDisplay label="KYC Done:" value={user.kycDone ? "Yes" : "No"} />
            <KeyValueDisplay label="Phone Number:" value={user.phoneNumber || ''} />
            <KeyValueDisplay label="Occupation:" value={user.occupation || ''} />
            </div>
          <div className="flex flex-col gap-3">
            <KeyValueDisplay label="Emirates ID:" value={user.emiratesId || "-"} />
            <KeyValueDisplay label="Zip Code:" value={user.zipCode || ''} />
            <KeyValueDisplay label="State:" value={user.state || ''} />
            <KeyValueDisplay label="City:" value={user.city || ''} />
            <KeyValueDisplay label="Address:" value={user.address || ''} />
            <KeyValueDisplay label="Gender:" value={user.gender || ''} />
            <KeyValueDisplay label="Date of Birth:" value={new Date(user.dateOfBirth || '').toLocaleDateString()} />
            <KeyValueDisplay label="Referral Source:" value={user.referralSource || ''} />
            <KeyValueDisplay label="Join Reason:" value={user.joinReason || ''} />
            {
              user.role === 'PAID_USER' ? 
              <div className="text-yellow-500 bg-yellow-500/5 py-2 border-yellow-400 border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold w-fit px-10">{'Premium user'}</div>
              :
              user.role === 'FREE_USER' ?
              <div className="text-black bg-violet-500/5 py-2 border-black border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold w-fit px-10">{'Free user'}</div>
              :
              <KeyValueDisplay label="Subscription Plan:" value={user.role || ''} />
            }
            </div>
            </div>
          </div>
        </div>

        {/* ID Verification Card */}
        <div className="  bg-white w-[30%]">

          <div className="p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <img 
                  src={user.avatarUrl ? user.avatarUrl : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" }
                  alt="Permanent Resident Card" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md border border-gray-200"
                />

                <div className="absolute top-2 right-2 ">
                  {
                    user.kycDone ?
                         <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VERIFIED
                  </Badge>:
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      PENDING
                      </Badge>
                  }
             
                </div>

              </div>
              
              <div className="space-y-2">
                  {
                    user.kycDone ?
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ">
                  Document Verified
                </Badge>
                    :
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 ">
                  Document Pending Verification
                    </Badge>
                  
                  }
                
              </div>
              
              <div className="bg-gray-50 rounded-lg p-">
                {
                  user.kycDone && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>This document has been verified and authenticated</span>
                  </div>
                  )
                }
               
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

export default AboutUser;