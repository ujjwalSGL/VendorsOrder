import { z } from "zod";

export const addressFrameworks = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];
export const countryFrameworks = [
  {
    value: "australia",
    label: "Australia",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "canada",
    label: "Canada",
  },
];
export const igstFrameworks = [
  {
    value: "0",
    label: "0 %",
  },
  {
    value: "3",
    label: "3 %",
  },
  {
    value: "5",
    label: "5 %",
  },
  {
    value: "12",
    label: "12 %",
  },
  {
    value: "18",
    label: "18 %",
  },
  {
    value: "28",
    label: "28 %",
  },
];

export const currencyFrameworks = [
  {
    value: "Dollar",
    label: "USD",
  },
  {
    value: "Dollar",
    label: "USA",
  },
  {
    value: "Canadian Dollar",
    label: "CAD",
  },
  {
    value: "Euro",
    label: "EUR",
  },
  {
    value: "United Kingdom",
    label: "GBP",
  },
  {
    value: "Japan",
    label: "JPY",
  },
  {
    value: "Australia",
    label: "AUD",
  },
  {
    value: "India",
    label: "INR",
  },
  {
    value: "China",
    label: "CNY",
  },
  {
    value: "Mexico",
    label: "MXN",
  },
];

export const countryStateFrameWork = [
  {
    value: "Queensland",
    label: "Queensland",
  },
  {
    value: "Sydney",
    label: "Sydney",
  },
  {
    value: "Melbourne",
    label: "Melbourne",
  },
];

export const buyerFormSchema = z.object({
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
  alternateMobileNumber: z.string().max(20),
  pickupAddress: z
    .string()
    .nonempty({ message: "The pickup address is required." }),
  email: z
    .string()
    .nonempty({ message: "The email is required." })
    .email({ message: "Invalid email address" }),
  address1: z
    .string()
    .nonempty({ message: "The customer shipping address is required." })
    .max(100),
  address2: z.string().max(100),
  landmark: z
    .string()
    .nonempty({
      message: "The customer shipping address landmark is required.",
    })
    .max(100),
  country: z
    .string()
    .nonempty({ message: "The customer billing country is required." })
    .max(25),
  state: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  pinCode: z
    .string()
    .min(1, { message: "The customer shipping pincode is required." })
    .max(8),
  city: z
    .string()
    .nonempty({ message: "The customer shipping city is required." })
    .max(25),
  billingPinCode: z
    .string()
    .min(1, { message: "The customer billing pincode is required." })
    .max(8),
  billingCity: z
    .string()
    .nonempty({ message: "The customer billing city is required." })
    .max(25),
  billingFirstName: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  billingLastName: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  billingMobileNumber: z
    .string()
    .min(1, { message: "The customer mobile number is required." })
    .max(20),
  billingAddress1: z
    .string()
    .max(100)
    .nonempty({ message: "The customer shipping first name is required." }),
  billingAddress2: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(100),
  billingCountry: z
    .string()
    .nonempty({ message: "The customer billing country is required." })
    .max(25),
  billingState: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  billingLandmark: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
});
