import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";

interface PlaceOrderProps {
  prevStep: () => void;
}

function PlaceOrder({ prevStep }: PlaceOrderProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>

      <div className="gap-16 lg:grid-cols-2 lg:grid">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-400">Pickup Address:</h2>
          <h3 className="font-medium text-gray-900">Head OFFICE</h3>
          <div className="space-y-1 text-sm text-gray-500">
            <p>HEAD OFFICe mahipalpur</p>
            <p>Indira Park, South West Delhi</p>
            <p>Delhi-110045</p>
            <p>India</p>
            <p>8392328932</p>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-400">
            Delivery Address:
          </h2>
          <h3 className="font-medium text-gray-900">Demetria Riddle</h3>
          <div className="space-y-1 text-sm text-gray-500">
            <p>Voluptate non dolor</p>
            <p>Maxime officiis at f</p>
            <p>Not Applicable-Ut in consequatur V</p>
            <p>Cocos (Keeling) Islands</p>
            <p>Qui sed itaque odit</p>
          </div>
        </div>
      </div>

      <div className="gap-16 space-y-4 lg:grid-cols-3 lg:grid">
        <div className="space-y-1 lg:mt-4">
          <h2 className="text-base font-bold text-gray-400">
            Shipping Partner:
          </h2>
          <h3 className="font-medium text-gray-900">ShipGlobal WorldWide</h3>
          <p className="text-sm text-gray-400">Transit Time: 13 - 18 Days</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-400">Shipment Mode</h2>
          <h3 className="font-medium text-gray-900">CSB-IV</h3>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-400">Billed Weight:</h2>
          <h3 className="font-medium text-gray-900">1.00 KG</h3>
        </div>
      </div>

      <Card className="p-6 space-y-4 lg:px-20">
        <div className="flex justify-between text-sm font-medium text-black">
          <span className="text-gray-400">Logistic Fee</span>
          <span>Rs. 4,103.00</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-black">
          <span className="text-gray-400 ">GST</span>
          <span>Rs. 738.54</span>
        </div>
        <div className="flex justify-between pt-2 text-sm font-medium text-gray-900 border-t">
          <span className="text-gray-400">Total</span>
          <span>Rs. 4,841.54</span>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondaryShipping" onClick={prevStep}>
          <MoveLeft className="w-4 h-4" />
          Back
        </Button>
        <Button className="px-8 text-white bg-green-500 hover:bg-green-600">
          Pay & Add Order
        </Button>
      </div>
    </div>
  );
}

export default PlaceOrder;
