import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck, FilePen, Plus, MoveLeft, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface OrderDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const orderDetailsSchema = z.object({
  weight: z.string().min(1, "The package weight is required."),
  length: z.string().min(1, "The package length is required."),
  height: z.string().min(1, "The package breadth is required."),
  breath: z.string().min(1, "The package height is required."),
  invoiceNumber: z.string().min(1, "The invoice number is required."),
  invoiceDate: z.coerce.date(),
  invoiceCurrency: z.string().min(1, "Invoice currency is required"),
  orderId: z.string().min(1, "Order ID is required"),
  IOSSNumber: z.string().optional(),
  productName: z.string().min(1, "Product Title is required."),
  SKU: z.string().min(1, "SKU is required"),
  HSN: z.string().min(8, "8 Digit HSN Required"),
  Qty: z.string().min(1, "Product Qty is required."),
  unitPrice: z.string().min(1, "Product Price is required."),
  IGST: z.string().min(1, "IGST must be a positive number"),
});

type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

function OrderDetails({ nextStep, prevStep }: OrderDetailsProps) {
  const InitialOrderDetails = {
    weight: "",
    length: "",
    height: "",
    breath: "",
    invoiceNumber: "",
    invoiceDate: new Date(),
    invoiceCurrency: "",
    orderId: "",
    IOSSNumber: "",
    productName: "",
    SKU: "",
    HSN: "",
    Qty: "",
    unitPrice: "",
    IGST: "",
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

  const AddItemDetails = () => {};
  return (
    <div className="flex justify-between w-full gap-4">
      <div className="w-full">
        <Form {...orderDetailsForm}>
          <form onSubmit={orderDetailsForm.handleSubmit(handleOrderDetails)}>
            <div>
              <div>
                <h1 className="font-bold ">Shipment Type</h1>
                <div className="pt-1 space-y-4 text-xs text-gray-400">
                  <p>
                    Please select the shipment Mode. Note: CSB-V Shipments can
                    only be sent through ShipGlobal Direct. If other partner
                    services are needed please select CSB IV.
                  </p>
                  <p>
                    If you need more info, please call/whatsapp at
                    <span className="ml-1 text-blue-500 cursor-pointer">
                      +91 9811098919.
                    </span>
                  </p>
                </div>
              </div>
              <div className="gap-2 mt-8 lg:flex">
                <Card className="items-center gap-2 border-blue-300 border-dashed bg-blue-50 lg:flex p-7">
                  <UserCheck color="blue" />
                  <div>
                    <h1 className="text-sm font-semibold">CSB IV</h1>
                    <p className="text-xs text-gray-400">
                      Non Commercial Mode Minimum Documentation All Service
                      Providers
                    </p>
                  </div>
                </Card>
                <Card className="items-center gap-2 border-dashed hover:border-blue-300 hover:bg-blue-50 lg:flex p-7">
                  <FilePen color="blue" />
                  <div>
                    <h1 className="text-sm font-semibold">CSB V</h1>
                    <p className="text-xs text-gray-400 ">
                      Commercial Mode Valid Export Documents Required Only
                      ShipGlobal Direct
                    </p>
                  </div>
                </Card>
              </div>
              <div>
                <h1 className="mt-8 font-bold">Shipment Details</h1>
                <p className="text-xs text-gray-400">
                  If you need more info, please check out
                  <span className="ml-1 text-blue-500 cursor-pointer">
                    Help Page
                  </span>
                  .
                </p>
                <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-4">
                  <div className="flex">
                    <SimpleFormField
                      form={orderDetailsForm}
                      label="Weight"
                      type="dimension"
                      required
                      name="weight"
                      className="w-full lg:mt-2"
                      placeholder="0.0"
                      valueType="KG"
                    />
                  </div>

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Length"
                    type="dimension"
                    required
                    name="length"
                    placeholder="0"
                    valueType="CM"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Height"
                    type="dimension"
                    required
                    name="height"
                    placeholder="0"
                    valueType="CM"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Breath"
                    type="dimension"
                    required
                    name="breath"
                    placeholder="0"
                    valueType="CM"
                  />
                </div>
              </div>
              <div>
                <h1 className="mt-8 font-bold">Order Details</h1>
                <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-4">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Number"
                    type="text"
                    required
                    name="invoiceNumber"
                    className="lg:mt-2"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Date"
                    type="date"
                    required
                    name="invoiceDate"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Currency"
                    type="text"
                    required
                    name="invoiceCurrency"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Order ID"
                    type="text"
                    required
                    name="orderId"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="IOSS Number"
                    type="text"
                    name="IOSSNumber"
                  />
                </div>
              </div>
              <div>
                <h1 className="mt-8 font-bold">Item Details</h1>
                <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-11">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Product Name"
                    type="text"
                    required
                    name="productName"
                    className="col-span-2 mt-2"
                    placeholder="Type product name . . ."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="SKU"
                    type="text"
                    required
                    name="SKU"
                    placeholder="SKU . . ."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="HSN"
                    type="text"
                    required
                    name="HSN"
                    className="col-span-2 "
                    placeholder="HSN . . ."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Quantity"
                    type="number"
                    required
                    name="Qty"
                    placeholder="0"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Unit Price"
                    type="number"
                    required
                    name="unitPrice"
                    className="col-span-2 "
                    placeholder="0"
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="IGST"
                    type="number"
                    required
                    name="IGST"
                    className="col-span-2 "
                    placeholder="0 %"
                  />
                </div>
              </div>
              <div>
                <Button
                  variant={"secondaryShipping"}
                  className="mt-5"
                  onClick={AddItemDetails}
                >
                  <Plus />
                  Add
                </Button>
              </div>
              <div className="flex justify-between mt-10">
                <Button variant="secondaryShipping" onClick={prevStep}>
                  <MoveLeft />
                  Back
                </Button>
                <Button
                  variant={"shipping"}
                  onClick={orderDetailsForm.handleSubmit(handleOrderDetails)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default OrderDetails;
