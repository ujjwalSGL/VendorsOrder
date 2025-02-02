import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import BuyerDetails from "./BuyersDetails";
import OrderDetails from "./OrderDetails";
import ShippingPartner from "./ShippingPartner";
import PlaceOrder from "./PlaceOrder";
export default function Stepper() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: "Buyer Details" },
    { id: 2, label: "Order Details" },
    { id: 3, label: "Shipping Partner" },
    { id: 4, label: "Place Order" },
  ];

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex gap-8 p-6 max-w-[1200px] mx-auto">
      {/* Vertical Stepper */}
      <div className="w-48 shrink-0">
        {steps.map((stepItem) => (
          <div
            key={stepItem.id}
            className={cn(
              "flex items-start gap-3 p-4 cursor-pointer",
              stepItem.id === step ? "text-blue-600" : "text-gray-500"
            )}
            onClick={() => setStep(stepItem.id)}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                stepItem.id === step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {stepItem.id}
            </div>
            <span className="text-sm font-medium mt-1.5">{stepItem.label}</span>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <Card className="flex-1 p-6">
        {step === 1 && <BuyerDetails nextStep={nextStep} />}
        {step === 2 && <OrderDetails nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && (
          <ShippingPartner nextStep={nextStep} prevStep={prevStep} />
        )}
        {step === 4 && <PlaceOrder prevStep={prevStep} />}
      </Card>
    </div>
  );
}
