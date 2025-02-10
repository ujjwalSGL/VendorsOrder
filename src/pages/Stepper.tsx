import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import BuyerDetails from "./BuyersDetail";
import OrderDetails from "./OrderDetails";
import ShippingPartner from "./ShippingPartner";
import PlaceOrder from "./PlaceOrder";
import { Check } from "lucide-react";

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
    <div className="gap-6 p-6 gap-y-4 lg:flex">
      <Card className="flex flex-col justify-center w-full p-6 lg:w-1/4">
        {steps.map((stepItem) => (
          <div
            key={stepItem.id}
            className={cn(
              "flex items-start gap-3 p-4 cursor-pointer font-bold",
              stepItem.id < step ? "text-gray-400" : "text-black"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center",
                stepItem.id <= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              )}
            >
              {stepItem.id < step ? <Check size={16} /> : stepItem.id}
            </div>
            <span className="text-sm font-medium mt-1.5">{stepItem.label}</span>
          </div>
        ))}
      </Card>

      <Card className="w-full p-6 lg:w-3/4">
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
