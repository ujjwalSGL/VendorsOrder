import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Accordion from "@/components/elements/Accordion";
import { useState, useEffect } from "react";
import { CircleCheck, Loader } from "lucide-react";
import clsx from "clsx";

function ShippingPartner({ activeState }: any) {
  const [loadingPartner, setLoadingPartner] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [shippingPartnerData, setShippingPartnerData] = useState<any>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("shippingPartnerData");
      if (storedData) {
        setShippingPartnerData(JSON.parse(storedData));
      }
      const storedPartner = localStorage.getItem("selectedShippingPartner");
      if (storedPartner) {
        setSelectedPartner(JSON.parse(storedPartner));
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  const handlePartnerSelection = (partner: any) => {
    if (loadingPartner) return;
    setLoadingPartner(partner.display_name);
    setTimeout(() => {
      setLoadingPartner(null);
      setSelectedPartner(partner);
      console.log("partner selected", partner.display_name);
      localStorage.setItem("selectedShippingPartner", JSON.stringify(partner));
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
            All shipments via ShipGlobal Direct service are
            <span className="font-bold"> Delivered Duty Paid (DDP) </span>,
            hence no extra duty will be billed on the consignee or the shipper.
            Rates are inclusive of COVID & fuel surcharge, exclusive of GST and
            ex-Delhi Hub.
          </p>
          <div>
            If you need more info, please call/whatsapp at
            <span className="ml-1 font-bold text-blue-900 cursor-pointer">
              011-422 77 777.
            </span>
          </div>
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
            <p className="text-xs text-gray-400">Billed Weight</p>
          </Card>
        </div>
        <h1 className="mt-4 text-sm font-bold">Available Shipping Partners</h1>
        <div className="mt-2">
          <table className="w-full">
            <thead className="flex items-center p-2.5 font-light text-gray-600 bg-gray-100 border justify-around rounded-xl">
              <th className="font-normal">Courier Partner</th>
              <th className="font-normal">Delivery Time</th>
              <th className="font-normal">Shipment Rate</th>
              <th className="font-normal">Select</th>
            </thead>
          </table>
          {shippingPartnerData?.rate?.map((partner: any, id: number) => (
            <tbody
              key={id}
              className="flex flex-col mt-2 border border-blue-200 rounded-lg"
            >
              <tr className="w-full">
                <td className="w-full p-1 text-xs font-medium text-red-500 rounded-t-lg bg-blue-50">
                  Duties will be charged, if applicable.
                </td>
              </tr>
              <tr className="flex items-center justify-around w-full p-2 border-b">
                <td className="flex items-center gap-2 font-bold">
                  {partner.display_name}
                </td>
                <td>{partner.transit_time}</td>
                <td>Rs. {partner.rate}</td>
                <td
                  className="cursor-pointer"
                  onClick={() => handlePartnerSelection(partner)}
                >
                  {loadingPartner === partner.display_name ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <CircleCheck
                      className={clsx(
                        "text-white rounded-full",
                        selectedPartner?.display_name === partner.display_name
                          ? "bg-green-500"
                          : "bg-gray-300"
                      )}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </div>
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
