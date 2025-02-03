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
  valueType?: string;
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
  valueType,
}: SimpleFormFieldProps) {
  switch (type) {
    case "dimension":
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
                <div className="flex">
                  <Input
                    type="number"
                    {...field}
                    placeholder={placeholder}
                    className="w-full rounded-r-none"
                    disabled={disabled}
                  />
                  <span className="flex items-center justify-center py-1.5 px-2 text-sm border rounded-r-sm bg-slate-100">
                    {valueType}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
  }
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
