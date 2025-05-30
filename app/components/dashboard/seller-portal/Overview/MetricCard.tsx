import { ArrowUp, ArrowDown } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent } from "../../../ui/Card";

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  trendDirection: "up" | "down";
}

const SellerMetricCard = ({
  icon,
  title,
  value,
  trend,
  trendLabel,
  trendDirection,
}: MetricCardProps) => {
  return (
    <Card className="bg-white border-0 rounded-xl shadow-md">
      <CardContent className="pt-6">
        <div className="flex justify-start items-center gap-5 mb-4">
          <div className=" p-2 rounded-lg  border-[#E6E4E7] border-2">{icon}</div>
          <h2 className="text-lg font-semibold text-[#1A181B] mb-1">{title}</h2>

   

        </div>
        <div className="flex justify-between">

          <div>
          <p className="text-3xl font-semibold mb-3">{value}</p>

          <div className="flex items-center ">
            <div className={`text-xs font-medium flex items-center ${
              trendDirection === "up" ? "text-green-500" : "text-red-500"
            }`}>
              {trendDirection === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {trend}%
            </div>
            <span className="text-xs text-gray-400 ml-1">{trendLabel}</span>
          </div>
          </div>

          <div className="mt-4 ">
          {trendDirection === "up" ? (
            <svg className="w-full h-8" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 10 L20 15 L40 5 L60 10 L80 8 L100 2"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg className="w-full h-8" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 5 L20 10 L40 8 L60 15 L80 10 L100 12"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>

        </div>
        
     
      </CardContent>
    </Card>
  );
};

export default SellerMetricCard;