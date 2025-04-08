import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";

const OrderSummary = () => {
  return (
    <Card className="bg-white border-0 rounded-xl shadow-md">
      <CardHeader className="mb-0">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-400">Pending Orders</h3>
              <div className="text-sm text-gray-400">160/400 Orders</div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl mr-3 w-14">40%</span>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-400">Shipped Orders</h3>
              <div className="text-sm text-gray-400">120/400 Orders</div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl mr-3 w-14">30%</span>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-400">Delivered Orders</h3>
              <div className="text-sm text-gray-400">120/400 Orders</div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-xl mr-3 w-14">30%</span>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
