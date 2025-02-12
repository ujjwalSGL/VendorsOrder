import SimpleFormField from "@/components/elements/SimpleFormField";
import { addressFrameworks } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/elements/Accordion";

function ConsignorDetails({ activeState, setActiveState }: any) {
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
    setActiveState(2);
  };

  return (
    <Accordion
      title="Consignor Details"
      stepNum={1}
      activeState={activeState}
      setActiveState={setActiveState}
    >
      <div className="p-4">
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
              className="w-4/5"
            />
            <div className="flex items-end justify-end mt-4">
              <Button type="submit" variant={"secondaryShipping"}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Accordion>
  );
}

export default ConsignorDetails;
