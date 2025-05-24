import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Building2, MapPin, Calendar, FileText, Shield, CheckCircle } from "lucide-react";
import KeyValueDisplay from "./keyValueDisplay";

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

const AboutUser = () => {

const userData = {
  firstName: "JS",
  lastName: "Ventures",
  email: "js.ventures@example.com",
  referralId: "ref12345",
  createdAt: "2020-10-05T00:00:00.000Z",
  walletBalance: 1250.50,
  role: "PAID_USER",
  kycDone: false, 
  phoneNumber: "+1-555-0123",
  occupation: "Business Owner",
  emiratesId: null,
  zipCode: "62704",
  state: "Illinois",
  city: "Springfield",
  address: "123, Springfield, Illinois, USA",
  gender: "Male",
  dateOfBirth: "1985-07-22T00:00:00.000Z",
  referralSource: "Social Media",
  joinReason: "For business compliance",
  avatarUrl: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
};



  return (
    <div className=" pt-4 w-full ">
   

      <div className="flex gap-4 w-full ">
        {/* Business Information Card */}

        <div className=" border-0  w-[100%] ">

          <div className="px-2 space-y-10">
            <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
            <KeyValueDisplay label="First Name:" value={userData.firstName} />
            <KeyValueDisplay label="Last Name:" value={userData.lastName} />
            <KeyValueDisplay label="Email:" value={userData.email} />
            <KeyValueDisplay label="Referral ID:" value={userData.referralId} />
            <KeyValueDisplay label="Created At:" value={new Date(userData.createdAt).toLocaleDateString()} />
            <KeyValueDisplay label="Wallet Balance:" value={`$${userData.walletBalance.toFixed(2)}`} />
            <KeyValueDisplay label="Role:" value={userData.role} />
            <KeyValueDisplay label="KYC Done:" value={userData.kycDone ? "Yes" : "No"} />
            <KeyValueDisplay label="Phone Number:" value={userData.phoneNumber} />
            <KeyValueDisplay label="Occupation:" value={userData.occupation} />
            </div>
          <div className="flex flex-col gap-3">
            <KeyValueDisplay label="Emirates ID:" value={userData.emiratesId || "-"} />
            <KeyValueDisplay label="Zip Code:" value={userData.zipCode} />
            <KeyValueDisplay label="State:" value={userData.state} />
            <KeyValueDisplay label="City:" value={userData.city} />
            <KeyValueDisplay label="Address:" value={userData.address} />
            <KeyValueDisplay label="Gender:" value={userData.gender} />
            <KeyValueDisplay label="Date of Birth:" value={new Date(userData.dateOfBirth).toLocaleDateString()} />
            <KeyValueDisplay label="Referral Source:" value={userData.referralSource} />
            <KeyValueDisplay label="Join Reason:" value={userData.joinReason} />
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
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" 
                  alt="Permanent Resident Card" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md border border-gray-200"
                />

                <div className="absolute top-2 right-2 ">
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VERIFIED
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 ">
                  Document Verified
                </Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>This document has been verified and authenticated</span>
                </div>
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