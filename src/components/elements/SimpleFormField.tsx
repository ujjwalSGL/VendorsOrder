import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

interface SimpleFormFieldProps {
  form: any;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  valueType?: string;
  framework?: { value: string; label: string }[];
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
  framework,
}: SimpleFormFieldProps) {
  const [open, setOpen] = useState(false);

  switch (type.toLowerCase()) {
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
                  <span className="flex items-center justify-center py-1.5 px-2.5 text-sm border rounded-r-sm bg-zinc-200">
                    {valueType}
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
    case "date":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black">
                {label} {required && <Required />}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-medium",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date...</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date?.toISOString().split("T")[0]);
                      setOpen(false);
                    }}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
    case "popover-select":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel className="text-black">
                {label} {required && <Required />}
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "justify-between w-full font-medium",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <span className="truncate">
                        {field.value
                          ? framework?.find(
                              (option) => option.value === field.value
                            )?.label
                          : placeholder || "Select option"}
                      </span>
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 max-w-96">
                  <Command className="overflow-y-auto max-h-96">
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                      <CommandEmpty>No option found.</CommandEmpty>
                      <CommandGroup>
                        {framework?.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={(currentValue) => {
                              form.setValue(
                                name,
                                currentValue === field.value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <span className="truncate">{option.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
    // case "checkbox":
    //   return (
    //     <FormField
    //       control={form.control}
    //       name={name}
    //       render={({ field }) => (
    //         <FormItem>
    //           <div className="space-y-2">
    //             {options.map((option, id) => (
    //               <div key={id} className="flex items-center space-x-2">
    //                 <FormControl>
    //                   <Checkbox
    //                     checked={field.value?.includes(option)}
    //                     onCheckedChange={(checked) => {
    //                       const currentAnswers = field.value || [];
    //                       const newAnswers = checked
    //                         ? [...currentAnswers, option]
    //                         : currentAnswers.filter(
    //                             (ans: string) => ans !== option
    //                           );
    //                       field.onChange(newAnswers);
    //                       onChange?.(newAnswers);
    //                     }}
    //                   />
    //                 </FormControl>
    //                 <FormLabel className="text-sm font-normal">
    //                   {option}
    //                 </FormLabel>
    //               </div>
    //             ))}
    //           </div>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //   );

    default:
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
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />
      );
  }
}

const Required = () => <span className="text-red-500">*</span>;
