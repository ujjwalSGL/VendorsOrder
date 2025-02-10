import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface PlaceOrderProps {
  prevStep: () => void;
}

function PlaceOrder({ prevStep }: PlaceOrderProps) {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [buyerDetails, setBuyerDetails] = useState<any>(null);
  const [selectedShippingPartnerDetails, setSelectedShippingPartner] =
    useState<any>(null);

  useEffect(() => {
    const storedOrderDetails = JSON.parse(
      localStorage.getItem("OrderDetails") || "{}"
    );
    const storedBuyerDetails = JSON.parse(
      localStorage.getItem("buyerDetails") || "{}"
    );
    const storedSelectedShippingPartner = JSON.parse(
      localStorage.getItem("selectedShippingPartner") || "{}"
    );

    setOrderDetails(storedOrderDetails);
    setBuyerDetails(storedBuyerDetails);
    setSelectedShippingPartner(storedSelectedShippingPartner);
  }, []);

  const handleSubmit = () => {
    alert("Congratulations! Your order has been placed.");
  };

  const price = parseFloat(selectedShippingPartnerDetails?.price) || 0;
  const igstValue = parseFloat(orderDetails?.itemDetails?.[0]?.IGST) || 0;
  const gstPrice = ((price * igstValue) / 100).toFixed(2);
  const totalPrice = (price + parseFloat(gstPrice)).toFixed(2);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
      <div className="gap-16 lg:grid-cols-2 lg:grid">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-400">Pickup Address:</h2>
          <h3 className="font-medium text-gray-900">{"Head OFFICE"}</h3>
          <div className="space-y-1 text-sm text-gray-500">
            <p>{buyerDetails?.pickupAddress}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-bold text-gray-400">
            Delivery Address:
          </h2>
          <h3 className="font-medium text-gray-900">
            {buyerDetails?.firstName}
          </h3>
          <div className="space-y-1 text-sm text-gray-500">
            <p>{buyerDetails?.address1}</p>
            <p>{buyerDetails?.city}</p>
            <p>{buyerDetails?.state}</p>
            <p>{buyerDetails?.country}</p>
            <p>{buyerDetails?.mobileNumber}</p>
          </div>
        </div>
      </div>

      <div className="gap-16 space-y-4 lg:grid-cols-3 lg:grid">
        <div className="space-y-1 lg:mt-4">
          <h2 className="text-base font-bold text-gray-400">
            Shipping Partner:
          </h2>
          <h3 className="font-medium text-gray-900">
            {selectedShippingPartnerDetails?.name}
          </h3>
          <p className="text-sm text-gray-400">
            Transit Time: {selectedShippingPartnerDetails?.transitTime}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-400">Shipment Mode</h2>
          <h3 className="font-medium text-gray-900">"CSB-IV"</h3>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-gray-400">Billed Weight:</h2>
          <h3 className="font-medium text-gray-900">
            {orderDetails?.weight || ""} KG
          </h3>
        </div>
      </div>
      <Card className="p-6 space-y-4 lg:px-20">
        <div className="flex justify-between text-sm font-medium text-black">
          <span className="text-gray-400">Logistic Fee</span>
          <span>Rs. {price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-black">
          <span className="text-gray-400">GST ({igstValue}%)</span>
          <span>Rs. {gstPrice}</span>
        </div>
        <div className="flex justify-between pt-2 text-sm font-medium text-gray-900 border-t">
          <span className="text-gray-400">Total</span>
          <span>Rs. {totalPrice}</span>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="secondaryShipping" onClick={prevStep}>
          <MoveLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          className="px-8 text-white bg-green-500 hover:bg-green-600"
          onClick={handleSubmit}
        >
          Pay & Add Order
        </Button>
      </div>
    </div>
  );
}

export default PlaceOrder;
