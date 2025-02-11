import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { currencyFrameworks, igstFrameworks } from "@/lib/constants";
import { orderDetailsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface OrderDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
}

type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

function ShipmentInformation({ nextStep, prevStep }: OrderDetailsProps) {
  const InitialOrderDetails = {
    weight: 0,
    length: 0,
    height: 0,
    breath: 0,
    invoiceNumber: "",
    invoiceDate: new Date(),
    invoiceCurrency: "",
    orderId: "",
    IOSSNumber: "",
    itemDetails: [
      {
        productName: "",
        SKU: "",
        HSN: "",
        Qty: "",
        unitPrice: "",
        IGST: "",
      },
    ],
  };
  const orderDetailsForm = useForm<OrderDetailsType>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: InitialOrderDetails,
  });

  const handleOrderDetails = (data: OrderDetailsType) => {
    console.log(data);
    localStorage.setItem("OrderDetails", JSON.stringify(data));
    nextStep();
  };

  const addItemDetails = () => {
    const currentItems = orderDetailsForm.getValues("itemDetails");
    orderDetailsForm.setValue("itemDetails", [
      ...currentItems,
      {
        productName: "",
        SKU: "",
        HSN: "",
        Qty: "",
        unitPrice: "",
        IGST: "",
      },
    ]);
  };

  const removeItemDetails = (index: number) => {
    const currentItems = orderDetailsForm.getValues("itemDetails");
    if (currentItems.length > 1) {
      const updatedItems = [
        ...currentItems.slice(0, index),
        ...currentItems.slice(index + 1),
      ];
      orderDetailsForm.setValue("itemDetails", updatedItems);
    }
  };

  return (
    <Card className="flex justify-between w-full gap-4 px-6 pb-4">
      <div className="w-full">
        <Form {...orderDetailsForm}>
          <form onSubmit={orderDetailsForm.handleSubmit(handleOrderDetails)}>
            <div>
              <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={orderDetailsForm}
                  label="Invoice Number"
                  type="text"
                  required
                  name="invoiceNumber"
                  className="lg:mt-2"
                  placeholder="Enter invoice number . . ."
                />

                <SimpleFormField
                  form={orderDetailsForm}
                  label="Invoice Date"
                  type="date"
                  required
                  name="invoiceDate"
                />

                <div className="mt-2 space-y-2">
                  <SimpleFormField
                    form={orderDetailsForm}
                    type="popover-select"
                    name="invoiceCurrency"
                    label="Invoice Currency"
                    required
                    placeholder="Select . . ."
                    framework={currencyFrameworks}
                  />
                </div>

                <SimpleFormField
                  form={orderDetailsForm}
                  label="Order ID"
                  type="text"
                  required
                  name="orderId"
                  placeholder="Enter order id . . ."
                />
              </div>
              <h1 className="mt-6 text-base font-bold">Box Measurements</h1>
              <div className="gap-4 space-y-2 lg:grid lg:grid-cols-4">
                <div className="flex">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Dead Weight"
                    type="dimension"
                    required
                    name="weight"
                    className="w-full lg:mt-2"
                    placeholder="0.0"
                    valueType="kg"
                  />
                </div>

                <SimpleFormField
                  form={orderDetailsForm}
                  label="Length"
                  type="dimension"
                  required
                  name="length"
                  placeholder="0"
                  valueType="cm"
                />

                <SimpleFormField
                  form={orderDetailsForm}
                  label="Height"
                  type="dimension"
                  required
                  name="height"
                  placeholder="0"
                  valueType="cm"
                />

                <SimpleFormField
                  form={orderDetailsForm}
                  label="Breath"
                  type="dimension"
                  required
                  name="breath"
                  placeholder="0"
                  valueType="cm"
                />
              </div>
            </div>
            <div>
              <div>
                <h1 className="mt-6 text-base font-bold">
                  Item(s) Details{" "}
                  <span className="p-0.5 px-1 rounded-sm text-xs font-light text-red-500 bg-orange-100">
                    Items that can export
                  </span>
                </h1>
                {orderDetailsForm.watch("itemDetails").map((_, index) => (
                  <div
                    key={index}
                    className="gap-2 mt-2 space-y-2 lg:grid lg:grid-cols-12"
                  >
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="Product Name"
                      type="text"
                      required
                      name={`itemDetails.${index}.productName`}
                      className="col-span-2 mt-2"
                      placeholder="Enter Product Name . . ."
                    />
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="SKU"
                      type="text"
                      required
                      className="col-span-2"
                      name={`itemDetails.${index}.SKU`}
                      placeholder="Enter SKU . . ."
                    />
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="HSN"
                      type="text"
                      required
                      className="col-span-2"
                      name={`itemDetails.${index}.HSN`}
                      placeholder="Enter HSN . . ."
                    />
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="Qty"
                      type="number"
                      className="col-span-2"
                      required
                      name={`itemDetails.${index}.Qty`}
                      placeholder="0"
                    />
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="Unit Price"
                      type="number"
                      required
                      className="col-span-2"
                      name={`itemDetails.${index}.unitPrice`}
                      placeholder="0"
                    />
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="IGST"
                      type="popover-select"
                      required
                      name={`itemDetails.${index}.IGST`}
                      placeholder="0%"
                      className="col-span-1"
                      framework={igstFrameworks}
                    />
                    <div className="pt-8 cursor-pointer">
                      {index >= 1 && (
                        <div onClick={() => removeItemDetails(index)}>
                          <Trash2 color="red" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center mt-5 text-base font-medium text-blue-900 underline cursor-pointer"
                  onClick={addItemDetails}
                >
                  <Plus size={16} />
                  Add Another Product
                </div>
                <div className="mt-5 text-base font-bold cursor-pointer">
                  Total Price : INR 101672.00
                </div>
              </div>
              <div className="flex justify-end mt-10 i">
                <Button
                  variant={"secondaryShipping"}
                  onClick={orderDetailsForm.handleSubmit(handleOrderDetails)}
                >
                  Select Shipping
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default ShipmentInformation;
