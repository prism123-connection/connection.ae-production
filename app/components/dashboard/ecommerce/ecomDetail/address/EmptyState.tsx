import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddAddress: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddAddress }) => {
  return (
    <div className="flex w-[475px] max-w-full flex-col items-stretch font-normal text-center pt-[193px] px-[17px] rounded-[0px_0px_0px_0px] max-md:pt-[100px]">
      <p className="text-black text-base leading-8 max-md:max-w-full">
        You haven't saved any addresses yet. Please add a new one by clicking
        "Add Address."
      </p>
      <Button
        onClick={onAddAddress}
        className="bg-[rgba(12,135,214,1)] self-center flex items-center gap-2.5 text-sm text-white leading-none mt-2 px-6 py-2.5 rounded-lg max-md:px-5"
      >
        <Plus className="w-3 h-3" />
        Add address
      </Button>
    </div>
  );
};
