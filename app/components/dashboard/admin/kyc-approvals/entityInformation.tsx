import { KycType } from "@/app/types/models";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Building2, MapPin, Calendar, FileText, Shield, CheckCircle } from "lucide-react";

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
  data : KycType
}

const EntityInformation:React.FC<props> = ({data}) => {


  return (
    <div className=" pt-4 max-w-6xl">
   

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Business Information Card */}

        <div className=" border-0 bg-white">

          <div className="px-2 space-y-4">
            <div className="grid gap-4">

              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Entity Name:</span>
                <span className="font-semibold text-gray-900 text-right">{data.entityName}</span>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Registration Number:</span>
                <span className="font-semibold text-gray-900 text-right">{data.commercialRegNumber}</span>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Date of Expiry:</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{new Date(data.crExpiryDate || '').toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Date of Incorporation:</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold text-gray-900">{new Date(data.incorporationDate || '').toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Country of Incorporation:</span>
                <span className="font-semibold text-gray-900 text-right">{data.countryOfIncorporation}</span>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Type of Entity:</span>
                  <span className="font-semibold text-gray-900 text-right">{data.typeOfEntity}</span>
              </div>
              
              <div className="flex justify-between items-start  ">
                <span className="font-medium text-gray-600 min-w-[140px]">Registration Address:</span>
                <div className="flex items-start gap-2 text-right">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{data.registeredAddress}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-600 min-w-[140px]">Operational Address:</span>
                <div className="flex items-start gap-2 text-right">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="font-semibold text-gray-900">{data.operationalAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ID Verification Card */}
        <div className="  bg-white">

          <div className="p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <img 
                  src={data.owners[0].idDocumentUrl}
                  alt="Permanent Resident Card" 
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md border border-gray-200"
                />

                <div className="absolute top-2 right-2 hidden">
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    VERIFIED
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">ID Proof</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hidden">
                  Document Verified
                </Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mt-4 hidden">
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

export default EntityInformation;