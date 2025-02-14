import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { buyerFormSchema } from "@/lib/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { useCountries, useStates } from "@/pages/Api";
import Accordion from "@/components/elements/Accordion";

type BuyerFormType = z.infer<typeof buyerFormSchema>;

function ConsigneeDetails({ activeState, setActiveState }: any) {
  const [addressSame, setAddressSame] = useState(true);
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const shippingStates = useStates(selectedCountry);
  const billingStates = useStates(selectedBillingCountry);

  const initialBuyersDetails = {
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
    addressSame: false,
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
  };

  const buyersDetailsForm = useForm<BuyerFormType>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: initialBuyersDetails,
  });

  const handleBuyerDetails = (data: BuyerFormType) => {
    console.log(data);
    localStorage.setItem("consigneeDetails", JSON.stringify(data));
    setActiveState(3);
  };

  const handleAddressCheckbox = () => {
    setAddressSame((prev) => !prev);
  };

  const shippingAddress = buyersDetailsForm.watch([
    "firstName",
    "lastName",
    "mobileNumber",
    "alternateMobileNumber",
    "email",
    "country",
    "address1",
    "landmark",
    "address2",
    "pinCode",
    "city",
    "state",
  ]);

  useEffect(() => {
    if (addressSame) {
      buyersDetailsForm.setValue(
        "billingFirstName",
        buyersDetailsForm.getValues("firstName")
      );
      buyersDetailsForm.setValue(
        "billingLastName",
        buyersDetailsForm.getValues("lastName")
      );
      buyersDetailsForm.setValue(
        "billingMobileNumber",
        buyersDetailsForm.getValues("mobileNumber")
      );
      buyersDetailsForm.setValue(
        "billingAddress1",
        buyersDetailsForm.getValues("address1")
      );
      buyersDetailsForm.setValue(
        "billingAddress2",
        buyersDetailsForm.getValues("address2")
      );
      buyersDetailsForm.setValue(
        "billingLandmark",
        buyersDetailsForm.getValues("landmark")
      );
      buyersDetailsForm.setValue(
        "billingPinCode",
        buyersDetailsForm.getValues("pinCode")
      );
      buyersDetailsForm.setValue(
        "billingCity",
        buyersDetailsForm.getValues("city")
      );
      buyersDetailsForm.setValue(
        "billingCountry",
        buyersDetailsForm.getValues("country")
      );
      buyersDetailsForm.setValue(
        "billingState",
        buyersDetailsForm.getValues("state")
      );
    }
  }, [addressSame, buyersDetailsForm, shippingAddress]);

  useEffect(() => {
    const countryState = buyersDetailsForm.watch((value, { name }) => {
      if (name === "country") {
        setSelectedCountry(value.country || "");
        buyersDetailsForm.setValue("state", "");
      }
      if (name === "billingCountry") {
        setSelectedBillingCountry(value.billingCountry || "");
        buyersDetailsForm.setValue("billingState", "");
      }
    });
    return () => countryState.unsubscribe();
  }, [buyersDetailsForm]);

  return (
    <Accordion
      title="Consignee Details"
      stepNum={2}
      activeState={activeState}
      setActiveState={setActiveState}
    >
      <div className="w-full p-4">
        <Form {...buyersDetailsForm}>
          <form onSubmit={buyersDetailsForm.handleSubmit(handleBuyerDetails)}>
            <h1 className="font-bold">Buyer's Personal Details</h1>
            <div className="space-y-2 text-sm">
              <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="First name"
                  type="text"
                  required
                  name="firstName"
                  className="mt-2"
                  placeholder="First name . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Last name"
                  type="text"
                  required
                  name="lastName"
                  placeholder="Last name . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Mobile No."
                  type="number"
                  required
                  name="mobileNumber"
                  placeholder="Type number . . ."
                />

                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Alternate Mobile No."
                  type="number"
                  name="alternateMobileNumber"
                  placeholder="Type number . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Email Id"
                  type="text"
                  required
                  name="email"
                  placeholder="Type mail id . . ."
                />
              </div>
              <h1 className="pt-6 text-sm font-bold">Buyer Shipping Details</h1>
              <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 1"
                  type="text"
                  required
                  name="address1"
                  className="mt-2"
                  placeholder="Type address . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 2"
                  type="text"
                  name="address2"
                  placeholder="Type address . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Landmark"
                  type="text"
                  required
                  name="landmark"
                  placeholder="Type landmark . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Country"
                  type="popover-select"
                  required
                  name="country"
                  framework={countries.map(
                    (country: { name: string; code: string }) => ({
                      label: country.name,
                      value: country.code,
                    })
                  )}
                  placeholder="Select country . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="State"
                  type="popover-select"
                  required
                  name="state"
                  placeholder="Select state . . ."
                  framework={shippingStates.states.map(
                    (state: { name: string; code: string }) => ({
                      label: state.name,
                      value: state.code,
                    })
                  )}
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="City"
                  type="text"
                  required
                  name="city"
                  placeholder="Type city . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Pincode"
                  type="number"
                  required
                  name="pinCode"
                  className="lg:mt-2"
                  placeholder="Type pincode . . ."
                />
              </div>
              <div className="flex items-center pt-3 my-6 space-x-2">
                <Checkbox
                  id="terms"
                  checked={addressSame}
                  onCheckedChange={handleAddressCheckbox}
                />
                <Label htmlFor="terms" className="text-sm ">
                  Shipping & Billing Address are same.
                </Label>
              </div>
              {!addressSame && (
                <div>
                  <h1 className="mt-6 text-sm font-bold">
                    Buyer Billing Details
                  </h1>
                  <div className="gap-4 mt-4 space-y-2 lg:grid lg:grid-cols-3">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="First name"
                      type="text"
                      required
                      className="mt-2"
                      name="billingFirstName"
                      placeholder="Enter last name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Last name"
                      type="text"
                      required
                      name="billingLastName"
                      placeholder="Enter first name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Mobile No."
                      type="number"
                      required
                      name="billingMobileNumber"
                      placeholder="Enter mobile number . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 1"
                      type="text"
                      required
                      name="billingAddress1"
                      placeholder="Enter house number . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 2"
                      type="text"
                      required
                      name="billingAddress2"
                      placeholder="Enter Address 2 . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Landmark"
                      type="text"
                      required
                      name="billingLandmark"
                      placeholder="Enter Landmark . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Country"
                      type="popover-select"
                      required
                      name="billingCountry"
                      placeholder="Select country . . ."
                      framework={countries.map(
                        (country: { name: string; code: string }) => ({
                          label: country.name,
                          value: country.code,
                        })
                      )}
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="State"
                      type="popover-select"
                      required
                      name="billingState"
                      placeholder="Select state . . ."
                      framework={billingStates.states.map(
                        (state: { name: string; code: string }) => ({
                          label: state.name,
                          value: state.code,
                        })
                      )}
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="City"
                      type="text"
                      required
                      name="billingCity"
                      placeholder="Enter city . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Pincode"
                      type="number"
                      required
                      name="billingPinCode"
                      placeholder="Enter pincode . . ."
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button variant={"secondaryShipping"} type="submit">
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

export default ConsigneeDetails;
