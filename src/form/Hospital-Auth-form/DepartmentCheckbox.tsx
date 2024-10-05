import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

type Props = {
  department: string
  field: ControllerRenderProps<FieldValues, "departments">
}
function DepartmentCheckbox({ department, field }: Props) {
  const valueArray = Array.isArray(field.value) ? field.value : []
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={valueArray.includes(department)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...valueArray, department])
            } else {
              field.onChange(
                valueArray.filter((value: string) => value !== department)
              )
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{department}</FormLabel>
    </FormItem>
  )
}

export default DepartmentCheckbox
