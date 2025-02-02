import { Button } from "@/components/ui/button";

interface ShippingPartnerProps {
  nextStep: () => void;
  prevStep: () => void;
}

function ShippingPartner({ nextStep, prevStep }: ShippingPartnerProps) {
  return (
    <div>
      ShippingPartner
      <div className="flex justify-between">
        <Button onClick={prevStep}>Previous</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}

export default ShippingPartner;
