import Accordion from "@/components/elements/Accordion";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { currencyFrameworks, igstFrameworks } from "@/lib/constants";
import { orderDetailsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

function ShipmentInformation({ activeState, setActiveState }: any) {
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
    setActiveState(4);
  };

  const { control } = orderDetailsForm;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemDetails",
  });

  const appendItemDetailsColumn = () => {
    append({
      productName: "",
      SKU: "",
      HSN: "",
      Qty: "",
      unitPrice: "",
      IGST: "",
    });
  };

  return (
    <Accordion
      title="Shipment Information"
      stepNum={3}
      activeState={activeState}
      setActiveState={setActiveState}
    >
      <div className="flex justify-between w-full gap-4 p-4">
        <div className="w-full">
          <Form {...orderDetailsForm}>
            <form onSubmit={orderDetailsForm.handleSubmit(handleOrderDetails)}>
              <div>
                <div className="gap-4 space-y-2 lg:grid lg:grid-cols-3">
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
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="gap-2 mt-2 space-y-2 lg:grid lg:grid-cols-12"
                    >
                      <SimpleFormField
                        form={orderDetailsForm}
                        label="Product"
                        type="text"
                        required
                        name={`itemDetails.${index}.productName`}
                        placeholder="Enter Product Name..."
                        className="col-span-2 mt-2"
                      />
                      <SimpleFormField
                        form={orderDetailsForm}
                        label="SKU"
                        type="text"
                        required
                        name={`itemDetails.${index}.SKU`}
                        placeholder="Enter SKU..."
                        className="col-span-2"
                      />
                      <SimpleFormField
                        form={orderDetailsForm}
                        label="HSN"
                        type="text"
                        required
                        name={`itemDetails.${index}.HSN`}
                        placeholder="Enter HSN..."
                        className="col-span-2"
                      />
                      <SimpleFormField
                        form={orderDetailsForm}
                        label="Qty"
                        type="number"
                        required
                        name={`itemDetails.${index}.Qty`}
                        placeholder="0"
                        className="col-span-2"
                      />
                      <SimpleFormField
                        form={orderDetailsForm}
                        label="Unit Price"
                        type="number"
                        required
                        name={`itemDetails.${index}.unitPrice`}
                        placeholder="0"
                        className="col-span-2"
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
                      {index > 0 && (
                        <div
                          className="pt-10 cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          <Trash2 color="red" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center mt-5 text-base font-medium text-blue-900 underline cursor-pointer"
                    onClick={appendItemDetailsColumn}
                  >
                    <Plus size={16} />
                    Add Another Product
                  </div>
                  <div className="mt-5 text-base font-bold cursor-pointer">
                    Total Price : INR 101672.00
                  </div>
                </div>
                <div className="flex justify-end mt-10 i">
                  <Button variant={"secondaryShipping"}>Select Shipping</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Accordion>
  );
}

export default ShipmentInformation;
