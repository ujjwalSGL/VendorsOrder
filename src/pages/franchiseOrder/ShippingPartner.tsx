import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { shippingPartners } from "@/lib/constants";

interface ShippingPartnerProps {
  nextStep: () => void;
  prevStep: () => void;
}

function ShippingPartner({ nextStep, prevStep }: ShippingPartnerProps) {
  const [selectedPartner, setSelectedPartner] = useState<string>(
    localStorage.getItem("selectedShippingPartnerId") || ""
  );

  const handleSelectPartner = (id: string) => {
    setSelectedPartner(id);

    const selectedPartnerData = shippingPartners.find(
      (partner) => partner.id === id
    );

    if (selectedPartnerData) {
      localStorage.setItem(
        "selectedShippingPartner",
        JSON.stringify(selectedPartnerData)
      );
    }
  };
  return (
    <Card className="p-6">
      <div className="pt-1 space-y-4 text-sm font-normal">
        <p>
          All shipments via ShipGlobal Direct service are{" "}
          <span className="font-bold">Delivered Duty Paid (DDP)</span>, hence no
          extra duty will be billed on the consignee or the shipper. Rates are
          inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi
          Hub.
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
      <div className="items-center justify-between mt-2 space-y-5">
        {shippingPartners.map((partner) => (
          <Card
            key={partner.id}
            className={`flex gap-5 p-5 border-dashed cursor-pointer ${
              selectedPartner === partner.id ? "border-blue-500" : ""
            }`}
            onClick={() => handleSelectPartner(partner.id)}
          >
            <input
              type="radio"
              name="shippingPartner"
              id={partner.id}
              checked={selectedPartner === partner.id}
              onChange={() => handleSelectPartner(partner.id)}
              className="mr-2"
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="gap-2 font-semibold">
                  {partner.name}
                  {partner.recommended && (
                    <span className="p-1 ml-2 text-xs font-medium text-green-400 bg-green-100 rounded-md">
                      cheapest
                    </span>
                  )}
                </h1>
                {partner.hasDuties && (
                  <p className="text-xs text-red-500">
                    Duties will be charged if applicable
                  </p>
                )}
                {partner.document && (
                  <p className="text-xs text-red-500">
                    Documents are not allowed
                  </p>
                )}
                <p className="text-sm font-medium text-gray-400">
                  Estimated Transit: {partner.transitTime}
                </p>
              </div>
              <div className="text-sm">
                Rs.
                <span className="ml-1 text-lg font-bold">
                  {partner.price.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <Button variant={"secondaryShipping"} onClick={nextStep}>
          Continue
        </Button>
      </div>
    </Card>
  );
}

export default ShippingPartner;
