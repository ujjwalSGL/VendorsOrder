import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { addressFrameworks, buyerFormSchema } from "@/lib/constants";
import { countryFrameworks } from "@/lib/constants";
import { countryStateFrameWork } from "@/lib/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SimpleFormField from "@/components/elements/SimpleFormField";

type BuyerFormType = z.infer<typeof buyerFormSchema>;

function BuyerDetails({ nextStep }: any) {
  const initialBuyersDetails = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address1: "",
    address2: "",
    pickupAddress: "",
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

  const [addressSame, setAddressSame] = useState(true);

  const handleBuyerDetails = (data: BuyerFormType) => {
    console.log(data);
    localStorage.setItem("buyerDetails", JSON.stringify(data));
    nextStep();
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

  return (
    <div className="flex justify-between w-full gap-4">
      <div className="w-full">
        <Form {...buyersDetailsForm}>
          <form onSubmit={buyersDetailsForm.handleSubmit(handleBuyerDetails)}>
            <h1 className="font-bold">
              Select Pickup Address <span className="text-red-500">*</span>
            </h1>
            <div className="mt-2 space-y-2">
              <SimpleFormField
                form={buyersDetailsForm}
                type="popover-select"
                name="pickupAddress"
                placeholder="Select address . . ."
                framework={addressFrameworks}
              />
            </div>
            <h1 className="mt-5 font-bold">Buyer Shipping Details</h1>
            <div className="mt-4 space-y-4 text-sm">
              <div className="gap-4 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="First name"
                  type="text"
                  required
                  name="firstName"
                  className="lg:mt-2"
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
              </div>
              <div className="w-full gap-4 mt-2 space-y-2 lg:flex">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Alternate Mobile No."
                  type="number"
                  name="alternateMobileNumber"
                  className="lg:w-2/6 lg:mt-2"
                  placeholder="Type number . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Email Id"
                  type="text"
                  required
                  name="email"
                  className="lg:w-4/6"
                  placeholder="Type mail id . . ."
                />
              </div>
              <div className="mt-2 space-y-2">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Country"
                  type="popover-select"
                  required
                  name="country"
                  placeholder="Select country . . ."
                  framework={countryFrameworks}
                />
              </div>

              <div className="gap-4 mt-2 space-y-2 lg:grid lg:grid-cols-2">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 1"
                  type="text"
                  required
                  name="address1"
                  className="lg:mt-2"
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
              </div>
              <div className="mt-2">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 2"
                  type="text"
                  name="address2"
                  placeholder="Type address . . ."
                />
              </div>
              <div className="gap-4 mt-2 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Pincode"
                  type="number"
                  required
                  name="pinCode"
                  className="lg:mt-2"
                  placeholder="Type pincode . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="City"
                  type="text"
                  required
                  name="city"
                  placeholder="Type city . . ."
                />
                <div className="mt-2 space-y-2">
                  <SimpleFormField
                    form={buyersDetailsForm}
                    label="Country"
                    type="popover-select"
                    required
                    name="state"
                    placeholder="Select state . . ."
                    framework={countryStateFrameWork}
                  />
                </div>
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
                  <div className="gap-4 space-y-2 lg:grid lg:grid-cols-3">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="First name"
                      type="text"
                      required
                      name="billingFirstName"
                      className="mt-2"
                      placeholder="Type last name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Last name"
                      type="text"
                      required
                      name="billingLastName"
                      placeholder="Type first name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Mobile No."
                      type="number"
                      required
                      name="billingMobileNumber"
                      placeholder="Type mobile number . . ."
                    />
                  </div>
                  <div className="mt-2 space-y-2">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Country"
                      type="popover-select"
                      required
                      name="billingCountry"
                      placeholder="Select country . . ."
                      framework={countryFrameworks}
                    />
                  </div>
                  <div className="gap-4 mt-2 space-y-2 lg:grid lg:grid-cols-2">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 1"
                      type="text"
                      required
                      name="billingAddress1"
                      placeholder="Type house number . . ."
                      className="mt-2"
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Landmark"
                      type="text"
                      required
                      name="billingLandmark"
                      placeholder="Type street name . . ."
                    />
                  </div>
                  <div className="mt-2">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 2"
                      type="text"
                      required
                      name="billingAddress2"
                      placeholder="Type locality . . ."
                    />
                  </div>
                  <div className="gap-4 mt-2 space-y-2 lg:grid lg:grid-cols-3">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Pincode"
                      type="number"
                      required
                      name="billingPinCode"
                      placeholder="Type pincode . . ."
                      className="mt-2"
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="City"
                      type="text"
                      required
                      name="billingCity"
                      placeholder="Type city . . ."
                    />
                    <div className="mt-2 space-y-2">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Country"
                        type="popover-select"
                        required
                        name="billingState"
                        placeholder="Select state . . ."
                        framework={countryStateFrameWork}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button
                  variant={"shipping"}
                  type="submit"
                  onClick={buyersDetailsForm.handleSubmit(handleBuyerDetails)}
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

export default BuyerDetails;
