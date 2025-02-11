import SimpleFormField from "@/components/elements/SimpleFormField";
import { addressFrameworks } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AccordionStepper from "./AccordionStepper";

function ConsignorDetails() {
  const ConsignorDetailsSchema = z.object({
    pickupAddress: z
      .string()
      .nonempty({ message: "The pickup address is required." }),
  });
  type ConsignorFormType = z.infer<typeof ConsignorDetailsSchema>;

  const ConsignorDetailsForm = useForm<ConsignorFormType>({
    resolver: zodResolver(ConsignorDetailsSchema),
    defaultValues: {
      pickupAddress: "",
    },
  });
  const handleConsignorDetails = (data: ConsignorFormType) => {
    localStorage.setItem("ConsignorDetails", JSON.stringify(data));
    console.log(data);
    // nextStep();
  };
  return (
    <Card className="p-6">
      <Form {...ConsignorDetailsForm}>
        <form
          onSubmit={ConsignorDetailsForm.handleSubmit(handleConsignorDetails)}
        >
          <SimpleFormField
            form={ConsignorDetailsForm}
            type="popover-select"
            label="Search Customer"
            name="pickupAddress"
            placeholder="Select address . . ."
            framework={addressFrameworks}
            className="w-3/4"
          />
          <div className="flex items-end justify-end mt-4">
            <Button type="submit" variant={"secondaryShipping"}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

export default ConsignorDetails;
