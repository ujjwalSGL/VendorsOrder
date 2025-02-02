import { useState } from "react";
import { Card } from "@/components/ui/card";
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
    .min(1, { message: "The customer shipping postcode is required." })
    .max(8),
  city: z
    .string()
    .nonempty({ message: "The customer shipping city is required." })
    .max(25),
  houseNo: z
    .number({
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
    houseNo: 0,
    streetName: "",
    locality: "",
    addressSame: false,
    billingFirstName: "",
    billingLastName: "",
    billingMobileNumber: "",
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
                    className="justify-between w-full bg-slate-100 hover:bg-slate-200"
                  >
                    {address
                      ? addressFrameworks.find(
                          (framework) => framework.value === address
                        )?.label
                      : "Select Pickup Address"}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
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
            <div className="mt-8 space-y-6 text-sm">
              <div className="gap-4 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="First name"
                  type="text"
                  required
                  name="firstName"
                  placeholder="Enter here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Last name"
                  type="text"
                  required
                  name="lastName"
                  placeholder="Enter here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Mobile No."
                  type="number"
                  required
                  name="mobileNumber"
                  placeholder="Enter here . . ."
                />
              </div>
              <div className="gap-4 lg:grid lg:grid-cols-2">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Alternate Mobile No."
                  type="number"
                  name="alternateMobileNumber"
                  placeholder="Enter here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Email Id"
                  type="text"
                  required
                  name="email"
                  placeholder="Enter here . . ."
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="country">Country {required()}</Label>
                <Popover open={openCountry} onOpenChange={setOpenCountry}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCountry}
                      className="justify-between w-full bg-slate-100 hover:bg-slate-200"
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
              <div className="gap-4 pt-2 lg:grid lg:grid-cols-2">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 1"
                  type="text"
                  required
                  name="address1"
                  placeholder="Enter here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Landmark"
                  type="text"
                  required
                  name="landmark"
                  placeholder="Enter here . . ."
                />
              </div>
              <SimpleFormField
                form={buyersDetailsForm}
                label="Address 2"
                type="text"
                name="address2"
                placeholder="Enter here . . ."
              />
              <div className="gap-4 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Pincode"
                  type="number"
                  required
                  name="pinCode"
                  placeholder="Enter here . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="City"
                  type="text"
                  required
                  name="city"
                  placeholder="Enter here . . ."
                />
                <div className="mt-2">
                  <Label htmlFor="country">Country {required()}</Label>
                  <Popover open={openState} onOpenChange={setOpenState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openState}
                        className="justify-between w-full bg-slate-100 hover:bg-slate-200"
                      >
                        {countryState
                          ? countryStateFrameWork.find(
                              (framework) => framework.value === countryState
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
              <div className="flex items-center pt-3 space-x-2">
                <Checkbox id="terms" onClick={handleAddressCheckbox} />
                <Label htmlFor="terms" className="text-sm ">
                  Shipping & Billing Address are same.
                </Label>
              </div>
              <div>
                {addressSame == true && (
                  <div className="space-y-6">
                    <div className="gap-4 lg:grid lg:grid-cols-3">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="First name"
                        type="text"
                        required
                        name="billingFirstName"
                        placeholder="Enter here . . ."
                      />
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Last name"
                        type="text"
                        required
                        name="billingLastName"
                        placeholder="Enter here . . ."
                      />
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Mobile No."
                        type="number"
                        required
                        name="billingMobileNumber"
                        placeholder="Enter here . . ."
                      />
                    </div>
                    <div className="mt-8">
                      <Label htmlFor="country">Country {required()}</Label>
                      <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountry}
                            className="justify-between w-full bg-slate-100 hover:bg-slate-200"
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
                    <div className="gap-4 pt-2 lg:grid lg:grid-cols-2">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="House no."
                        type="text"
                        required
                        name="houseNo"
                        placeholder="Enter here . . ."
                      />
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Street Name"
                        type="text"
                        required
                        name="streetName"
                        placeholder="Enter here . . ."
                      />
                    </div>
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Locality"
                      type="text"
                      required
                      name="locality"
                      placeholder="Enter here . . ."
                    />
                    <div className="gap-4 lg:grid lg:grid-cols-3">
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="Pincode"
                        type="number"
                        required
                        name="pinCode"
                        placeholder="Enter here . . ."
                      />
                      <SimpleFormField
                        form={buyersDetailsForm}
                        label="City"
                        type="text"
                        required
                        name="city"
                        placeholder="Enter here . . ."
                      />
                      <div className="mt-2">
                        <Label htmlFor="country">Country {required()}</Label>
                        <Popover open={openState} onOpenChange={setOpenState}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openState}
                              className="justify-between w-full bg-slate-100 hover:bg-slate-200"
                            >
                              {countryState
                                ? countryStateFrameWork.find(
                                    (framework) =>
                                      framework.value === countryState
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
                  type="submit"
                  // onClick={buyersDetailsForm.handleSubmit(handleBuyerDetails)}
                  onClick={nextStep}
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
