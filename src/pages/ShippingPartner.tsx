import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoveLeft } from "lucide-react";

interface ShippingPartnerProps {
  nextStep: () => void;
  prevStep: () => void;
}

interface ShippingPartner {
  id: string;
  name: string;
  price: number;
  transitTime: string;
  hasDuties?: boolean;
  recommended?: boolean;
  document?: boolean;
}

const shippingPartners: ShippingPartner[] = [
  {
    id: "shipglobal",
    name: "ShipGlobal Direct",
    price: 6000,
    transitTime: "12 - 18 Days",
    recommended: true,
    document: true,
  },
  {
    id: "ups-promotional",
    name: "UPS Promotional",
    price: 12000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "dhl",
    name: "DHL Express",
    price: 15000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "ups",
    name: "UPS",
    price: 20000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
];

function ShippingPartner({ nextStep, prevStep }: ShippingPartnerProps) {
  const [selectedPartner, setSelectedPartner] = useState<string>("");

  const handleSelectPartner = (id: string) => {
    setSelectedPartner(id);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-lg font-bold">Select Shipping Partner</h1>
      <div className="pt-1 space-y-4 text-xs text-gray-400">
        <p>
          All shipments via ShipGlobal Direct service are Delivered Duty Paid
          (DDP), hence no extra duty will be billed on the consignee or the
          shipper. Rates are inclusive of covid & fuel surcharge, exclusive of
          GST and ex-Delhi Hub.
        </p>
        <p>
          If you need more info, please call/whatsapp at
          <span className="ml-1 text-blue-500 cursor-pointer">
            011-422 77 777.
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <Card className="px-3 py-2 border-dashed">
          <h1 className="text-sm font-bold">1 KG</h1>
          <p className="text-xs text-gray-400">Dead Weight</p>
        </Card>
        <Card className="px-3 py-2 border-dashed">
          <h1 className="text-sm font-bold">1 KG</h1>
          <p className="text-xs text-gray-400">Volumetric Weight</p>
        </Card>
        <Card className="px-3 py-2 border-black border-dashed">
          <h1 className="text-sm font-bold">1 KG</h1>
          <p className="text-xs text-gray-400">Billed Weight</p>
        </Card>
      </div>
      <div className="items-center justify-between mt-10 space-y-5">
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
      <div className="flex justify-between mt-10">
        <Button variant="secondaryShipping" onClick={prevStep}>
          <MoveLeft />
          Back
        </Button>
        <Button variant={"shipping"} onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ShippingPartner;
