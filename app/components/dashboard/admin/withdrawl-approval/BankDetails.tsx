import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { KycType, User } from "@/app/types/models";
import KeyValueDisplay from "../keyValueDisplay";

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


const BankDetails :React.FC<props>  = ({user})=>  {
  return (
    <div className=" pt-4 w-full ">
   

      <div className="flex gap-4 w-full ">
        {/* Business Information Card */}

        <div className=" border-0  w-[100%] ">

          <div className="px-2 space-y-10">
            <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
                {
                    user.kycDone && 
                     <div className="flex justify-start gap-5 items-center  ">
                        <span className="font-medium text-gray-600 min-w-[140px]">{"Kyc Approval Status:"}</span>
                        <div className="text-green-500 bg-green-500/5 px-10 py-2 border-green-400 border-[1px] rounded-sm flex items-center justify-center mr-10 text-sm font-semibold">{'APPROVED'}</div>
                    </div>
                     
                }
            <KeyValueDisplay label="IBAN Number:" value={user.kyc?.iban || ""} />
            <KeyValueDisplay label="Account Number:" value={user.kyc?.accountNumber || ""} />
            <KeyValueDisplay label="Swift Code:" value={user.kyc?.swiftCode || ""} />
            <KeyValueDisplay label="Routing Number:" value={user.kyc?.routingNumber || ""} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;