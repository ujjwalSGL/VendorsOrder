import SimpleFormField from "@/components/elements/SimpleFormField";
import { addressFrameworks } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/elements/Accordion";
import { ConsignorDetailsSchema } from "@/lib/schema";

function ConsignorDetails({
  activeState,
  setActiveState,
  formData,
  setFormData,
}: any) {
  type ConsignorFormType = z.infer<typeof ConsignorDetailsSchema>;

  const ConsignorDetailsForm = useForm<ConsignorFormType>({
    resolver: zodResolver(ConsignorDetailsSchema),
    defaultValues: formData.consignorDetails,
    // {
    //   pickupAddress: "",
    // },
  });

  const handleConsignorDetails = (data: ConsignorFormType) => {
    // localStorage.setItem("ConsignorDetails", JSON.stringify(data));
    // console.log(data);
    setFormData((prev: any) => ({
      ...prev,
      ConsignorDetails: {
        ...prev.ConsignorDetails,
        ...data,
      },
    }));
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

            <div className="mt-5 lg:justify-between lg:flex">
              <div className="gap-4 space-y-2 text-xs lg:justify-around lg:flex">
                <div>
                  <h1 className="mt-2 font-bold">Chinmay Singh</h1>
                  <p>chinmay.singh@shipglobal.in</p>
                  <p>+91-8287435835</p>
                </div>
                <div>
                  <h1 className="font-bold text-gray-400">Address</h1>
                  <p>Head OFFICE, mahipalpur, Indira Park, South West Delhi</p>
                  <p>Delhi-110045-8392328932</p>
                </div>
                <div>
                  <h1 className="font-bold text-gray-400 lg:ml-10">
                    Document Type
                  </h1>
                </div>
              </div>
              <div className="flex items-end justify-end mt-4">
                <Button type="submit" variant={"secondaryShipping"}>
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Accordion>
  );
}

export default ConsignorDetails;
