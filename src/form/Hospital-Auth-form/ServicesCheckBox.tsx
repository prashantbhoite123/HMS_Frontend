import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Props = {
  service: string
  field: ControllerRenderProps<FieldValues, "services">
}
const ServicesCheckBox = ({ service, field }: Props) => {
  const valueArray = Array.isArray(field.value) ? field.value : []
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={valueArray.includes(service)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...valueArray, service])
            } else {
              field.onChange(
                valueArray.filter((value: string) => value !== service)
              )
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{service}</FormLabel>
    </FormItem>
  )
}

export default ServicesCheckBox
