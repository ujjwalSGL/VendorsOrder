import { useState } from "react";
import ConsigneeDetails from "./ConsigneeDetails";
import ConsignorDetails from "./ConsignorDetails";
import ShipmentInformation from "./ShipmentInformation";
import ShippingPartner from "./ShippingPartner";
import { Card } from "@/components/ui/card";
import QuickTips from "./QuickTips";
import CustomerDetails from "./CustomerDetails";

const Stepper = () => {
  const [activeState, setActiveState] = useState(1);
  const [formData, setFormData] = useState({
    ConsignorDetails: {
      pickupAddress: "",
    },
    ConsigneeDetails: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      address1: "",
      address2: "",
      pinCode: "",
      city: "",
      landmark: "",
      country: "",
      alternateMobileNumber: "",
      state: "",
      addressSame: true,
      billingFirstName: "",
      billingLastName: "",
      billingMobileNumber: "",
      billingPinCode: "",
      billingCity: "",
      billingCountry: "",
      billingAddress2: "",
      billingAddress1: "",
      billingState: "",
      billingLandmark: "",
    },
    ShipmentInformation: {
      weight: "",
      length: "",
      height: "",
      breath: "",
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
    },
    ShippingPartner: {
      selectedPartner: "",
    },
  });
  console.log("stepper formData", formData);
  return (
    <div>
      <h1 className="p-6 mb-3 text-2xl font-semibold">Create CSB-IV Order</h1>
      <div className="flex justify-between gap-4 mx-8">
        <div className="w-full max-h-screen space-y-2 overflow-y-auto lg:w-5/6">
          <ConsignorDetails
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ConsigneeDetails
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ShipmentInformation
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ShippingPartner
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <Card className="hidden w-2/6 lg:block">
          {activeState == 1 ? (
            <div>
              <QuickTips />
            </div>
          ) : (
            <div>
              <CustomerDetails activeState={activeState} formData={formData} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Stepper;

// import { useState } from "react";
// import ConsigneeDetails from "./ConsigneeDetails";
// import ConsignorDetails from "./ConsignorDetails";
// import ShipmentInformation from "./ShipmentInformation";
// import ShippingPartner from "./ShippingPartner";
// import { Card } from "@/components/ui/card";
// import QuickTips from "./QuickTips";
// import CustomerDetails from "./CustomerDetails";

// const Stepper = () => {
//   const [activeState, setActiveState] = useState(1);
//   const [formData, setFormData] = useState({
//     consignorDetails: {
//       pickupAddress: "",
//     },
//     consigneeDetails: {
//       firstName: "",
//       lastName: "",
//       mobileNumber: "",
//       email: "",
//       address1: "",
//       address2: "",
//       pinCode: "",
//       city: "",
//       landmark: "",
//       country: "",
//       alternateMobileNumber: "",
//       state: "",
//       addressSame: true,
//       billingFirstName: "",
//       billingLastName: "",
//       billingMobileNumber: "",
//       billingPinCode: "",
//       billingCity: "",
//       billingCountry: "",
//       billingAddress2: "",
//       billingAddress1: "",
//       billingState: "",
//       billingLandmark: "",
//     },
//     shipmentInformation: {
//       weight: "",
//       length: "",
//       height: "",
//       breath: "",
//       invoiceNumber: "",
//       invoiceDate: new Date(),
//       invoiceCurrency: "",
//       orderId: "",
//       IOSSNumber: "",
//       itemDetails: [
//         {
//           productName: "",
//           SKU: "",
//           HSN: "",
//           Qty: "",
//           unitPrice: "",
//           IGST: "",
//         },
//       ],
//     },
//     shippingPartner: {
//       // shippingRates: [],
//       // selectedRate: null,
//     },
//   });

//   const updateFormData = ({ stepName, data }: any) => {
//     setFormData((prevData) => {
//       const newData = {
//         ...prevData,
//         [stepName]: data,
//       };
//       console.log(`Step ${activeState} data:`, newData[stepName]);
//       return newData;
//     });
//   };

//   const goToNextStep = () => {
//     setActiveState((prevState) => prevState + 1);
//   };

//   return (
//     <div>
//       <h1 className="p-6 mb-3 text-2xl font-semibold">Create CSB-IV Order</h1>
//       <div className="flex justify-between gap-4 mx-8">
//         <div className="w-full max-h-screen space-y-2 overflow-y-auto lg:w-5/6">
//           <ConsignorDetails
//             setActiveState={goToNextStep}
//             activeState={activeState}
//             formData={formData.consignorDetails}
//             updateFormData={(data: any) =>
//               updateFormData("consignorDetails", data)
//             }
//           />
//           <ConsigneeDetails
//             setActiveState={goToNextStep}
//             activeState={activeState}
//             formData={formData.consigneeDetails}
//             updateFormData={(data: any) =>
//               updateFormData("consigneeDetails", data)
//             }
//           />
//           <ShipmentInformation
//             setActiveState={goToNextStep}
//             activeState={activeState}
//             formData={formData.shipmentInformation}
//             updateFormData={(data: any) =>
//               updateFormData("shipmentInformation", data)
//             }
//           />
//           <ShippingPartner
//             setActiveState={goToNextStep}
//             activeState={activeState}
//             formData={formData}
//             updateFormData={(data: any) =>
//               updateFormData("shippingPartner", data)
//             }
//           />
//         </div>
//         <Card className="hidden w-2/6 lg:block">
//           {activeState == 1 ? (
//             <div>
//               <QuickTips />
//             </div>
//           ) : (
//             <div>
//               <CustomerDetails activeState={activeState} formData={formData} />
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Stepper;
