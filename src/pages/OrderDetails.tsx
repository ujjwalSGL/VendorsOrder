import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheck, FilePen } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface OrderDetailsProps {
  nextStep: () => void;
  prevStep: () => void;
}

const orderDetailsSchema = z.object({
  weight: z.number().min(1, "Weight is required"),
  length: z.number().min(1, "Length is required"),
  height: z.number().min(1, "Height is required"),
  breath: z.number().min(1, "Breath is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  invoiceCurrency: z.string().min(1, "Invoice currency is required"),
  orderId: z.string().min(1, "Order ID is required"),
  IOSSNumber: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  SKU: z.string().min(1, "SKU is required"),
  HSN: z.string().min(1, "HSN is required"),
  Qty: z.number().min(1, "Quantity should be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be a positive number"),
  IGST: z.number().min(0, "IGST must be a positive number"),
});

type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

function OrderDetails({ nextStep, prevStep }: OrderDetailsProps) {
  const InitialOrderDetails = {
    weight: 0,
    length: 0,
    height: 0,
    breath: 0,
    invoiceNumber: "",
    invoiceDate: new Date().toISOString(),
    invoiceCurrency: "",
    orderId: "",
    IOSSNumber: "",
    productName: "",
    SKU: "",
    HSN: "",
    Qty: 1,
    unitPrice: 0.0,
    IGST: 0.0,
  };
  const orderDetailsForm = useForm<OrderDetailsType>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: InitialOrderDetails,
  });
  const handleOrderDetails = (data: OrderDetailsType) => {
    console.log(data);
    localStorage.setItem("OrderDetails", JSON.stringify(data));
  };
  return (
    <div className="flex justify-between w-full gap-4">
      <Card className="flex justify-between w-1/4 gap-4 p-6 m-4"></Card>
      <Card className="flex justify-between w-3/4 gap-4 p-6 m-4">
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
              <div className="flex gap-6 mt-8">
                <Card className="flex items-center justify-center gap-2 border border-blue-300 border-dashed rounded-md cursor-pointer bg-blue-50 lg:flex p-7">
                  <UserCheck color="blue" />
                  <div>
                    <h1 className="text-sm font-semibold">CSB IV</h1>
                    <p className="text-xs text-gray-400">
                      Non Commercial Mode Minimum Documentation All Service
                      Providers
                    </p>
                  </div>
                </Card>
                <div className="flex items-center justify-center gap-2 border border-dashed rounded-md cursor-pointer hover:border-blue-300 hover:bg-blue-50 lg:flex p-7">
                  <FilePen className="text-blue-700" />
                  <div>
                    <h1 className="text-sm font-semibold">CSB V</h1>
                    <p className="text-xs text-gray-400 ">
                      Commercial Mode Valid Export Documents Required Only
                      ShipGlobal Direct
                    </p>
                  </div>
                </div>
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
                <div className="gap-4 mt-4 lg:grid lg:grid-cols-4">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Weight"
                    type="number"
                    required
                    name="weight"
                    placeholder="Enter weight..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Length"
                    type="number"
                    required
                    name="length"
                    placeholder="Enter length..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Height"
                    type="number"
                    required
                    name="height"
                    placeholder="Enter height..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Breath"
                    type="number"
                    required
                    name="breath"
                    placeholder="Enter breath..."
                  />
                </div>
              </div>
              <div>
                <h1 className="mt-8 font-bold">Order Details</h1>
                <div className="gap-4 mt-4 lg:grid lg:grid-cols-4">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Number"
                    type="text"
                    required
                    name="invoiceNumber"
                    placeholder="Enter invoice number..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Date"
                    type="date"
                    required
                    name="invoiceDate"
                    placeholder="Select invoice date..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Invoice Currency"
                    type="text"
                    required
                    name="invoiceCurrency"
                    placeholder="Enter invoice currency (e.g., USD)..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Order ID"
                    type="text"
                    required
                    name="orderId"
                    placeholder="Enter order ID..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="IOSS Number"
                    type="text"
                    name="IOSSNumber"
                    placeholder="Enter IOSS number (if applicable)..."
                  />
                </div>
              </div>
              <div>
                <h1 className="mt-8 font-bold">Item Details</h1>
                <div className="gap-4 mt-4 lg:grid lg:grid-cols-4">
                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Product Name"
                    type="text"
                    required
                    name="productName"
                    placeholder="Enter product name..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="SKU"
                    type="text"
                    required
                    name="SKU"
                    placeholder="Enter SKU..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="HSN"
                    type="text"
                    required
                    name="HSN"
                    placeholder="Enter HSN..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Quantity"
                    type="number"
                    required
                    name="Qty"
                    placeholder="Enter quantity..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="Unit Price"
                    type="number"
                    required
                    name="unitPrice"
                    placeholder="Enter unit price..."
                  />

                  <SimpleFormField
                    form={orderDetailsForm}
                    label="IGST"
                    type="number"
                    required
                    name="IGST"
                    placeholder="Enter IGST..."
                  />
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <Button onClick={prevStep}>Previous</Button>
                <Button onClick={nextStep}>Next</Button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default OrderDetails;
