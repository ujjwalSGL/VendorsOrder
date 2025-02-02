import { Button } from "@/components/ui/button";

interface PlaceOrderProps {
  prevStep: () => void;
}

function PlaceOrder({ prevStep }: PlaceOrderProps) {
  return (
    <div>
      Place order
      <div className="flex justify-normal">
        <Button onClick={prevStep}>Previous</Button>
      </div>
    </div>
  );
}

export default PlaceOrder;
