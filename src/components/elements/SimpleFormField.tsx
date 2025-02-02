import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SimpleFormFieldProps {
  form: any;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SimpleFormField({
  form,
  type,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
}: SimpleFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-black">
            {label} {required && <Required />}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              placeholder={placeholder}
              className="w-full"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
const Required = () => <span className="text-red-500">*</span>;
