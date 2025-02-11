import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import ConsignorDetails from "./ConsignorDetails";
import ConsigneeDetails from "./ConsigneeDetails";
import ShipmentInformation from "./ShipmentInformation";
import ShippingPartner from "./ShippingPartner";
import QuickTips from "./QuickTips";

function AccordionStepper() {
  return (
    <div className="flex justify-between gap-4 mx-8 mt-20">
      <div className="w-full lg:w-5/6">
        <h1 className="text-2xl font-semibold">Create CSB-IV Order</h1>
        <div className="space-y-2 ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                Consignor Details
              </AccordionTrigger>
              <AccordionContent>
                <ConsignorDetails />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                Consignee Details
              </AccordionTrigger>
              <AccordionContent>
                <ConsigneeDetails />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                Shipment Information
              </AccordionTrigger>
              <AccordionContent>
                <ShipmentInformation nextStep={() => {}} prevStep={() => {}} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                Select Shipping Partner
              </AccordionTrigger>
              <AccordionContent>
                <ShippingPartner nextStep={() => {}} prevStep={() => {}} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Card className="hidden w-2/6 lg:block">
        <div>
          <QuickTips />
        </div>
      </Card>
    </div>
  );
}

export default AccordionStepper;
