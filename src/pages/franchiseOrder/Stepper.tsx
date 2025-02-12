import { useState } from "react";
import ConsigneeDetails from "./ConsigneeDetails";
import ConsignorDetails from "./ConsignorDetails";
import ShipmentInformation from "./ShipmentInformation";
import ShippingPartner from "./ShippingPartner";
import { Card } from "@/components/ui/card";
import QuickTips from "./QuickTips";
import CustomerDetails from "./CustomerDetails";

const Stepper = () => {
  const [activeState, setActiveState] = useState(1);

  return (
    <div>
      <h1 className="p-6 mb-3 text-2xl font-semibold">Create CSB-IV Order</h1>
      <div className="flex justify-between gap-4 mx-8">
        <div className="w-full max-h-screen space-y-2 overflow-y-auto lg:w-5/6">
          <ConsignorDetails
            setActiveState={setActiveState}
            activeState={activeState}
          />
          <ConsigneeDetails
            setActiveState={setActiveState}
            activeState={activeState}
          />
          <ShipmentInformation
            setActiveState={setActiveState}
            activeState={activeState}
          />
          <ShippingPartner
            setActiveState={setActiveState}
            activeState={activeState}
          />
        </div>
        <Card className="hidden w-2/6 lg:block">
          {activeState == 1 ? (
            <div>
              <QuickTips />
            </div>
          ) : (
            <div>
              <CustomerDetails activeState={activeState} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Stepper;
