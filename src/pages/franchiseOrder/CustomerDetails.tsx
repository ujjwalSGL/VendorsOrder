import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

function CustomerDetails({ activeState }: any) {
  const [consignorDetails, setConsignorDetails] = useState<any>(null);
  const [consigneeDetails, setConsigneeDetails] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const storedConsignorDetails = JSON.parse(
      localStorage.getItem("ConsignorDetails") || "{}"
    );
    const storedConsigneeDetails = JSON.parse(
      localStorage.getItem("consigneeDetails") || "{}"
    );
    const storedOrderDetails = JSON.parse(
      localStorage.getItem("OrderDetails") || "{}"
    );

    setConsignorDetails(storedConsignorDetails);
    setConsigneeDetails(storedConsigneeDetails);
    setOrderDetails(storedOrderDetails);
  }, []);

  return (
    <div className="p-2">
      {activeState >= 2 && (
        <div>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1" className="border rounded-md">
              <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                Consignor Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 text-gray-500">
                  <div>
                    <p>Name:</p>
                    <p className="font-semibold text-black">
                      Chinmay singh | 8287435835
                    </p>
                    <p className="text-sm text-black">
                      chinmay.singh@shipglobal.in
                    </p>
                  </div>
                  <div className="mt-2">
                    <p>Address:</p>
                    <p className="text-sm text-black">
                      {consignorDetails?.pickupAddress}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      {activeState >= 3 && (
        <div className="mt-2">
          <div>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1" className="border rounded-md">
                <AccordionTrigger className="p-4 bg-gray-100 rounded-md">
                  Consignee Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 text-gray-500">
                    <div>
                      <p>Name:</p>
                      <p className="font-semibold text-black">
                        {consigneeDetails?.firstName}
                        {""} {consigneeDetails?.lastName} |{" "}
                        {consigneeDetails?.mobileNumber}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p>Shipping Address:</p>
                      <p className="mt-2 text-black">
                        {consigneeDetails?.address1}
                        {consigneeDetails?.address2}
                        {consigneeDetails?.landmark}
                        {consigneeDetails?.city}
                        {consigneeDetails?.pinCode}
                        {consigneeDetails?.state}
                        {consigneeDetails?.country}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p>Billing Address:</p>
                      <p>
                        <div className="mt-1 text-black">
                          Same as shipping address
                        </div>
                        {/* {consigneeDetails?.addressSame === true ? (
                          <div>Same as shipping address</div>
                        ) : (
                          <div>
                            <p className="mt-1 text-sm text-black">
                              {consigneeDetails?.billingAddress1}
                              {consigneeDetails?.billingAddress2}
                              {consigneeDetails?.billingLandmark}
                              {consigneeDetails?.billingCity}
                              {consigneeDetails?.billingPinCode}
                              {consigneeDetails?.billingState}
                              {consigneeDetails?.billingCountry}
                            </p>
                          </div>
                        )} */}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
      {activeState >= 4 && (
        <div className="p-2 mt-4 text-sm">
          <h1 className="text-base font-semibold text-black">Item Details</h1>
          <div className="grid items-center justify-between grid-cols-2 mt-2 font-normal text-gray-500">
            <div>
              <p>Billed Weight</p>
              <p className="font-semibold text-black">{orderDetails?.weight}</p>
            </div>
            <div>
              <p>Dimensions</p>
              <p className="font-semibold text-black">18 KG</p>
            </div>
          </div>
          <div className="grid items-center justify-between grid-cols-3 mt-2 text-gray-500">
            <div>
              <p>Product</p>
              <p className="font-semibold text-black">
                {orderDetails?.itemDetails?.[0]?.productName}
              </p>
            </div>
            <div>
              <p>HSN</p>
              <p className="font-semibold text-black">
                {orderDetails?.itemDetails?.[0]?.HSN}
              </p>
            </div>
            <div>
              <p>SKU</p>
              <p className="font-semibold text-black">
                {orderDetails?.itemDetails?.[0]?.SKU}
              </p>
            </div>
            <div>
              <p>Qty</p>
              <p className="font-semibold text-black">
                {orderDetails?.itemDetails?.[0]?.Qty}
              </p>
            </div>
            <div>
              <p>Unit Price</p>
              <p className="font-semibold text-black">
                {orderDetails?.itemDetails?.[0]?.unitPrice}
              </p>
            </div>
            <div>
              <p>Total</p>
              <p className="font-semibold text-black">
                1231.12
                {/* {orderDetails?.itemDetails?.[0]?.unitPrice} */}
              </p>
            </div>
          </div>
        </div>
      )}
      {activeState == 4 && (
        <Card className="mt-2 bg-orange-50">
          <div className="p-3 mt-1 font-bold text-orange-400 border-b border-orange-300">
            Summary
          </div>
          <CardContent className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h1>Logistic Fee</h1>
              <p>Rs. 21047.00</p>
            </div>
            <div className="flex items-center justify-between">
              <h1>GST</h1>
              <p>Rs. 3,788.46</p>
            </div>
          </CardContent>
          <div className="flex items-center justify-between p-3 pt-2 mb-3 font-bold bg-orange-100">
            <h1>Total</h1>
            <p>Rs 24835.46</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default CustomerDetails;
