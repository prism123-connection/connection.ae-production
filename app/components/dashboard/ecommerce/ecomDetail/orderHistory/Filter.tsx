import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type OrderFilter = "Date" | "Payment" | "Status" | "A-Z";

interface OrderFiltersProps {
  onFilterChange: (filter: OrderFilter, value: string) => void;
}

export const OrderFilters = ({ onFilterChange }: OrderFiltersProps) => {
  const filters: OrderFilter[] = ["Date", "Payment", "Status", "A-Z"];

  return (
    <div className="flex w-[495px] max-w-full items-stretch gap-[26px] text-[rgba(32,34,36,1)] font-normal flex-wrap mt-4">
      <div className="grow my-auto">Filter By</div>
      <div className="flex items-stretch gap-3 whitespace-nowrap grow shrink basis-auto">
        {filters.map((filter) => (
          <DropdownMenu key={filter}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[rgba(249,249,251,1)] border flex items-center gap-[18px] px-4 py-2 rounded-[10px] border-[rgba(213,213,213,1)] border-solid"
              >
                {filter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onFilterChange(filter, "asc")}>
                Ascending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange(filter, "desc")}>
                Descending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
};
