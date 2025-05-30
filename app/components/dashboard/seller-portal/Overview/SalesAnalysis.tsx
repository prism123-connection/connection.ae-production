
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { name: "November", value: 15000 },
  { name: "December", value: 13000 },
  { name: "January", value: 16000 },
  { name: "February", value: 15000 },
  { name: "March", value: 19000 },
  { name: "April", value: 22000 },
];

const SalesAnalysis = () => {
  return (
    <Card className="h-full bg-white border-0 rounded-xl shadow-md">
      <CardHeader className="flex flex-row items-center justify-between mb-0">
        <CardTitle className="text-lg">Sales Analysis</CardTitle>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Overall Sales</h3>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold">$348,253.65</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-md flex items-center">
              +13.02%
            </span>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesAnalysis;