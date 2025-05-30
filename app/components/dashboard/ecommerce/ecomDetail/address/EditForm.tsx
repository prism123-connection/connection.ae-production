import ActionButton from "@/app/components/ui/ActionButton";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/label";
import { ChevronDown, X } from "lucide-react";
// import { useForm } from "react-hook-form";

interface AddressFormProps {
//   onClose: () => void;
//   onSubmit: () => void;
cancelEdit: () => void;
}

export interface AddressFormData {
  name: string;
  email: string;
  address: string;
  contact: string;
  country: string;
  zipCode: string;
  vatNumber: string;
}

export const UpdateAddressForm: React.FC<AddressFormProps> = ({
//   onClose,
//   onSubmit,
cancelEdit
}) => {
    // const { register, handleSubmit, watch, } = useForm<AddressFormData>();

  return (
    <div className="w-full   py-10 bg-white rounded-lg">
      <form className="max-w-[700px] mx-auto ">
        <div className="w-full max-md:max-w-full   ">
          <div className="flex w-full items-center gap-2  max-md:max-w-full">
            <h2 className="text-[rgba(53,53,53,1)] text-base font-semibold leading-7 self-stretch flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
              Update Your Address:
            </h2>
            <button
              type="button"
            //   onClick={onClose}
              className="self-stretch flex min-h-6 items-center overflow-hidden justify-center w-6 my-auto px-1 py-[7px] rounded-xl hidden"
            >
              <X className="w-[11px] h-[11px]" />
            </button>
          </div>

          <div className="w-full  text-sm mt-5 max-md:max-w-full">
            <div className="flex gap-4  max-md:max-w-full">
              <div className="min-w-60 w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Name
                </Label>
                <Input
                //   {...register("name")}
                  placeholder="Enter your name"
                  className="mt-2 bg-white border-[rgba(202,202,202,1)]"
                />
              </div>
              <div className="min-w-60 w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Email
                </Label>
                <Input
                //   {...register("email")}/
                  type="email"
                  placeholder="Enter your email here"
                  className="mt-2 bg-white border-[rgba(202,202,202,1)]"
                />
              </div>
            </div>

            <div className="w-full mt-4 max-md:max-w-full">
              <Label className="text-[rgba(53,53,53,1)] font-medium">
                Billing address
              </Label>
              <Input
                // {...register("address")}
                placeholder="Address"
                className="mt-2 bg-white border-[rgba(202,202,202,1)]"
              />
            </div>

            <div className="flex gap-4  mt-4 max-md:max-w-full">
              <div className="min-w-60 w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Contact
                </Label>
                <div className="bg-white border flex min-h-[46px] w-full items-center gap-2 overflow-hidden font-normal leading-6 mt-2 px-4 py-[11px] rounded-lg border-[rgba(202,202,202,1)] border-solid">
                  <div className="flex items-center gap-1 text-[rgba(53,53,53,1)]">
                    <span>IN</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  <Input
                    // {...register("contact")}
                    placeholder="Enter phone number"
                    className="border-0 p-0 h-auto focus-visible:ring-0 text-[rgba(152,150,146,1)]"
                  />
                </div>
              </div>

              <div className="min-w-60 whitespace-nowrap w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Country
                </Label>
                <div className="bg-white border flex min-h-[46px] w-full items-center gap-2 overflow-hidden text-[rgba(152,150,146,1)] font-normal leading-6 mt-2 px-4 py-[11px] rounded-lg border-[rgba(202,202,202,1)] border-solid">
                  <Input
                    // {...register("country")}
                    placeholder="England"
                    className="border-0 p-0 h-auto focus-visible:ring-0"
                  />
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex gap-4  mt-4 max-md:max-w-full">
              <div className="min-w-60 w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Zip code
                </Label>
                <Input
                //   {...register("zipCode")}
                  placeholder="Enter Zip code"
                  className="mt-2 bg-white border-[rgba(202,202,202,1)]"
                />
              </div>
              <div className="min-w-60 w-full">
                <Label className="text-[rgba(53,53,53,1)] font-semibold">
                  Vat Number
                </Label>
                <Input
                //   {...register("vatNumber")}
                  placeholder="Enter VAT Number"
                  className="mt-2 bg-white border-[rgba(202,202,202,1)]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 ">
        <ActionButton onClick={cancelEdit} className="px-5! mt-5 max-h-[40px] rounded-lg! " variant="secondary">Cancel</ActionButton>
        <Button
          
          onClick={cancelEdit}
          className="w-full bg-[rgba(12,135,214,1)] text-sm text-white font-normal mt-5 px-5 py-4 rounded-lg"
        >
          Save
        </Button>
        </div>
      </form>
    </div>
  );
};
