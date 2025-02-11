"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
              <FormMessage className="text-xs" />
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
                      {field.value
                        ? framework?.find(
                            (option) => option.value === field.value
                          )?.label
                        : placeholder || "Select option"}
                      <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
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
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
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
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
  }
}

const Required = () => <span className="text-red-500">*</span>;
