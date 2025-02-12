import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Accordion from "@/components/elements/Accordion";
import { useState } from "react";
import { CircleCheck, Loader } from "lucide-react";
import clsx from "clsx";

function ShippingPartner({ activeState }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClick(true);
    }, 500);
  };

  return (
    <Accordion
      title="Select Shipping Partner"
      stepNum={4}
      activeState={activeState}
    >
      <div className="p-4">
        <div className="pt-1 space-y-4 text-sm font-normal">
          <p>
            All shipments via ShipGlobal Direct service are{" "}
            <span className="font-bold">Delivered Duty Paid (DDP)</span>, hence
            no extra duty will be billed on the consignee or the shipper. Rates
            are inclusive of covid & fuel surcharge, exclusive of GST and
            ex-Delhi Hub.
          </p>
          <p>
            If you need more info, please call/whatsapp at
            <span className="ml-1 font-bold text-blue-900 cursor-pointer">
              011-422 77 777.
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          <Card className="px-5 py-2.5 text-gray-500">
            <Label className="font-bold">1 KG</Label>
            <p className="text-xs text-gray-400">Dead Weight</p>
          </Card>
          <Card className="px-5 py-2.5 text-gray-500">
            <Label className="font-bold">1 KG</Label>
            <p className="text-xs text-gray-400">Volumetric Weight</p>
          </Card>
          <Card className="px-5 py-2 text-orange-400 bg-orange-100 border-amber-500">
            <Label className="text-base font-semibold">1 KG</Label>
            <p className="text-xs text-orange-400">Billed Weight</p>
          </Card>
        </div>
        <h1 className="mt-4 text-sm font-bold">Showing 1 Results</h1>
        <div className="mt-2">
          <table className="w-full">
            <thead className="flex items-center p-2.5 font-light text-gray-600 bg-gray-100 border justify-around rounded-xl">
              <th className="font-normal">Courier Partner</th>
              <th className="font-normal">Delivery Time</th>
              <th className="font-normal">Shipment Rate </th>
              <th className="font-normal">Select</th>
            </thead>
          </table>
          <tbody className="flex flex-col mt-2 border border-blue-200 rounded-lg">
            <div className="w-full p-1 text-xs font-medium text-red-500 rounded-t-lg bg-blue-50">
              Duties will be charged, if applicable.
            </div>
            <div className="flex items-center justify-around p-2">
              <td className="font-bold">UPS</td>
              <td>4 - 7 Days</td>
              <td>Rs. 21047</td>
              <td className="cursor-pointer" onClick={loading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <CircleCheck
                    className={clsx(
                      "text-white rounded-full",
                      isClick ? "bg-green-500" : "bg-gray-300"
                    )}
                  />
                )}
              </td>
            </div>
          </tbody>
        </div>
        <div className="mt-2"></div>
        <div className="flex justify-end mt-10">
          <Button variant={"secondaryShipping"} type="submit">
            Pay and Order
          </Button>
        </div>
      </div>
    </Accordion>
  );
}

export default ShippingPartner;
