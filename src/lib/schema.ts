import { z } from "zod";

//buyer Details Schema
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
    .nonempty({ message: "The customer shipping first name is required." }),
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
    .nonempty({ message: "The customer shipping first name is required." }),
  billingLandmark: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
});

//Order Details Schema
export const orderDetailsSchema = z.object({
  weight: z.coerce.number().min(1, "The package weight is required."),
  length: z.coerce.number().min(1, "The package length is required."),
  height: z.coerce.number().min(1, "The package breadth is required."),
  breath: z.coerce.number().min(1, "The package height is required."),
  invoiceNumber: z.string().min(1, "The invoice number is required."),
  invoiceDate: z.coerce.date(),
  invoiceCurrency: z.string().min(1, "Invoice currency is required"),
  orderId: z.string().min(1, "Order ID is required"),
  IOSSNumber: z.string().optional(),
  itemDetails: z.array(
    z.object({
      productName: z.string().min(1, "Product Title is required."),
      SKU: z.string().min(1, "SKU is required"),
      HSN: z.string().min(8, "8 Digit HSN Required"),
      Qty: z.string().min(1, "Product Qty is required."),
      unitPrice: z.string().min(1, "Product Price is required."),
      IGST: z.string().min(1, "IGST must be a positive number"),
    })
  ),
});
