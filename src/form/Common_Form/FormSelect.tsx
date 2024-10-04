import React from "react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"

interface FormSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  defaultValue?: string
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  defaultValue = "",
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormMessage className="text-red-600" />
          <FormControl>
            <select
              {...field}
              defaultValue={defaultValue}
              className="rounded-[5px] focus:outline-cyan-600 text-slate-300 mt-2 ml-2" // Add margin-top for gap
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default FormSelect
