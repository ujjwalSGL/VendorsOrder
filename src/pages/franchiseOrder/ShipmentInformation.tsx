import Accordion from "@/components/elements/Accordion";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { currencyFrameworks, igstFrameworks } from "@/lib/constants";
import { orderDetailsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import type z from "zod";
import apiClient from "./apiClient";
import { useState } from "react";

type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

function ShipmentInformation({
  activeState,
  setActiveState,
  formData,
  setFormData,
}: any) {
  const [validateOrderMessage, setValidateOrderMessage] = useState("");
  const [validateOrder, setValidateOrder] = useState(false);

  // const InitialOrderDetails = {
  //   weight: "",
  //   length: "",
  //   height: "",
  //   breath: "",
  //   invoiceNumber: "",
  //   invoiceDate: new Date(),
  //   invoiceCurrency: "",
  //   orderId: "",
  //   IOSSNumber: "",
  //   itemDetails: [
  //     {
  //       productName: "",
  //       SKU: "",
  //       HSN: "",
  //       Qty: "",
  //       unitPrice: "",
  //       IGST: "",
  //     },
  //   ],
  // };

  const orderDetailsForm = useForm<OrderDetailsType>({
    resolver: zodResolver(orderDetailsSchema),
    defaultValues: formData.ShipmentInformation,
    //  InitialOrderDetails,
  });

  const handleOrderDetails = async (data: OrderDetailsType) => {
    try {
      const orderPayload = {
        csbv: "0",
        currency_code: data.invoiceCurrency,
        package_weight: Number(data.weight),
        package_height: Number(data.height),
        package_length: Number(data.length),
        package_breadth: Number(data.breath),
        vendor_order_item: data.itemDetails.map((item) => ({
          vendor_order_item_name: item.productName,
          vendor_order_item_sku: item.SKU,
          vendor_order_item_quantity: Number(item.Qty),
          vendor_order_item_unit_price: Number(item.unitPrice),
          vendor_order_item_hsn: item.HSN,
          vendor_order_item_tax_rate: item.IGST,
        })),
      };

      const orderResponse = await apiClient.post(
        "/orders/validate-order-invoice",
        orderPayload
      );
      console.log("Order verification response:", orderResponse.data);

      if (!orderResponse.data) {
        throw new Error("Order validation failed");
      }

      setFormData((prev: any) => ({
        ...prev,
        ShipmentInformation: {
          ...prev.ShipmentInformation,
          ...data,
        },
      }));

      const shippingRatesPayload = {
        customer_shipping_postcode: formData.ConsigneeDetails.pinCode,
        customer_shipping_country_code: formData.ConsigneeDetails.country,
        package_weight: Number(data.weight),
        package_length: Number(data.length),
        package_breadth: Number(data.breath),
        package_height: Number(data.height),
      };

      const shippingRatesResponse = await apiClient.post(
        "/orders/get-shipper-rates",
        shippingRatesPayload
      );
      console.log("Shipping rates response:", shippingRatesResponse.data);

      if (!shippingRatesResponse.data?.data) {
        throw new Error("Failed to fetch shipping rates");
      }
      setFormData((prev: any) => ({
        ...prev,
        ShippingPartner: {
          ...prev.ShippingPartner,
          shippingRates: shippingRatesResponse.data.data,
        },
      }));

      setValidateOrder(false);
      setValidateOrderMessage("");
      setActiveState(4);
    } catch (error: any) {
      console.error("Error processing order details:", error);
      setValidateOrder(true);
      setValidateOrderMessage(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  };

  const { control, watch } = orderDetailsForm;
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
  const itemDetails = watch("itemDetails");
  const invoiceCurrency = watch("invoiceCurrency") || "INR";

  const totalPrice = itemDetails?.reduce((sum, item) => {
    const qty = Number(item.Qty) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return sum + qty * unitPrice;
  }, 0);

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
                    label="Breadth"
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
                <div>
                  {validateOrder ? (
                    <p className="m-2 text-xs font-semibold text-red-500">
                      {validateOrderMessage}
                    </p>
                  ) : (
                    ""
                  )}
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
                    Total Price : {invoiceCurrency}: {totalPrice}
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
