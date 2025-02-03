import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { addressFrameworks } from "@/lib/constants";
import { countryFrameworks } from "@/lib/constants";
import { countryStateFrameWork } from "@/lib/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SimpleFormField from "@/components/elements/SimpleFormField";

const buyerFormSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  lastName: z
    .string()
    .nonempty({ message: "The customer shipping last name is required." })
    .max(25),
  mobileNumber: z
    .string()
    .min(1, { message: "The customer mobile number is required." })
    .max(20),
  email: z
    .string()
    .nonempty({ message: "The email is required." })
    .email({ message: "Invalid email address" }),
  address1: z
    .string()
    .nonempty({ message: "The customer shipping address is required." })
    .max(100),
  landmark: z
    .string()
    .nonempty({
      message: "The customer shipping address landmark is required.",
    })
    .max(100),
  pinCode: z
    .string()
    .min(1, { message: "The customer shipping pincode is required." })
    .max(8),
  city: z
    .string()
    .nonempty({ message: "The customer shipping city is required." })
    .max(25),
  houseNo: z
    .string({
      message: "The customer billing address house number is required.",
    })
    .min(1, {
      message: "The customer billing address house number may not be correct",
    })
    .max(20),
  streetName: z
    .string()
    .nonempty({ message: "The customer billing street name is required." })
    .max(25),
  locality: z
    .string()
    .nonempty({ message: "The customer billing locality is required." })
    .max(25),
  billingPinCode: z
    .string()
    .min(1, { message: "The customer billing pincode is required." })
    .max(8),
  billingCity: z
    .string()
    .nonempty({ message: "The customer billing city is required." })
    .max(25),
});

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
    houseNo: "",
    streetName: "",
    locality: "",
    addressSame: false,
    billingFirstName: "",
    billingLastName: "",
    billingMobileNumber: "",
    billingPinCode: "",
    billingCity: "",
    billingCountry: "",
  };

  const buyersDetailsForm = useForm<BuyerFormType>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: initialBuyersDetails,
  });

  const [openAddress, setOpenAddress] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");
  const [addressSame, setAddressSame] = useState(true);

  const handleBuyerDetails = (data: BuyerFormType) => {
    console.log(data);
    localStorage.setItem("buyerDetails", JSON.stringify(data));
    nextStep();
  };
  const handleAddressCheckbox = () => {
    setAddressSame(!addressSame);
  };
  return (
    <div className="flex justify-between w-full gap-4">
      <div className="w-full">
        <Form {...buyersDetailsForm}>
          <form onSubmit={buyersDetailsForm.handleSubmit(handleBuyerDetails)}>
            <h1 className="font-bold">
              Select Pickup Address <span className="text-red-500">*</span>
            </h1>
            <div className="pt-6 pb-6 border-b border-slate-100">
              <Popover open={openAddress} onOpenChange={setOpenAddress}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openAddress}
                    className="justify-between w-full font-medium text-gray-400 bg-slate-50"
                  >
                    {address
                      ? addressFrameworks.find(
                          (framework) => framework.value === address
                        )?.label
                      : "Select Pickup Address"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {addressFrameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setAddress(
                                currentValue === address ? "" : currentValue
                              );
                              setOpenAddress(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                address === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <h1 className="mt-5 font-bold">Buyer Shipping Details</h1>
            <div className="mt-8 space-y-4 text-sm">
              <div className="gap-4 space-y-2 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="First name"
                  type="text"
                  required
                  name="firstName"
                  className="lg:mt-2"
                  placeholder="Type first name here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Last name"
                  type="text"
                  required
                  name="lastName"
                  placeholder="Type last name here . . ."
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
                <Label htmlFor="country">Country {required()}</Label>
                <Popover open={openCountry} onOpenChange={setOpenCountry}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCountry}
                      className="justify-between w-full font-medium text-gray-400 bg-slate-50"
                    >
                      {country
                        ? countryFrameworks.find(
                            (framework) => framework.value === country
                          )?.label
                        : "Select Country"}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {countryFrameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setCountry(
                                  currentValue === country ? "" : currentValue
                                );
                                setOpenCountry(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                  <Label htmlFor="country">State {required()}</Label>
                  <Popover open={openState} onOpenChange={setOpenState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openState}
                        className="justify-between w-full font-medium text-gray-400 bg-slate-50"
                      >
                        {countryState
                          ? countryStateFrameWork.find(
                              (framework) => framework.value === countryState
                            )?.label
                          : "Select state"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {countryStateFrameWork.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setCountryState(
                                    currentValue === countryState
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenState(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    countryState === framework.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex items-center pt-3 my-6 space-x-2">
                <Checkbox id="terms" onClick={handleAddressCheckbox} />
                <Label htmlFor="terms" className="text-sm ">
                  Shipping & Billing Address are same.
                </Label>
              </div>
              <div>
                {addressSame == true && (
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
                      <Label htmlFor="country">Country {required()}</Label>
                      <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountry}
                            className="justify-between w-full font-medium text-gray-400 bg-slate-50"
                          >
                            {country
                              ? countryFrameworks.find(
                                  (framework) => framework.value === country
                                )?.label
                              : "Select Country"}
                            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {countryFrameworks.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setCountry(
                                        currentValue === country
                                          ? ""
                                          : currentValue
                                      );
                                      setOpenCountry(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        country === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {framework.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="gap-4 mt-2 space-y-2 lg:grid lg:grid-cols-2">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="House no."
                        type="text"
                        required
                        name="houseNo"
                        placeholder="Type house number . . ."
                        className="mt-2"
                      />
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Street Name"
                        type="text"
                        required
                        name="streetName"
                        placeholder="Type street name . . ."
                      />
                    </div>
                    <div className="mt-2">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Locality"
                        type="text"
                        required
                        name="locality"
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
                        <Label htmlFor="state">State {required()}</Label>
                        <Popover open={openState} onOpenChange={setOpenState}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openState}
                              className="justify-between w-full font-medium text-gray-400 bg-slate-50"
                            >
                              {countryState
                                ? countryStateFrameWork.find(
                                    (framework) =>
                                      framework.value === countryState
                                  )?.label
                                : "Select State"}
                              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Search framework..." />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {countryStateFrameWork.map((framework) => (
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={(currentValue) => {
                                        setCountryState(
                                          currentValue === countryState
                                            ? ""
                                            : currentValue
                                        );
                                        setOpenState(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          countryState === framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {framework.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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

const required = () => {
  return <span className="text-red-500">*</span>;
};
