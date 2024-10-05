import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { departments } from "@/config/HospitalData"
import { useFormContext } from "react-hook-form"
import DepartmentCheckbox from "./DepartmentCheckbox"

const DepartmentSection = () => {
  const { control } = useFormContext()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Departments</h2>
        <FormDescription>
          Select the department that your hospiatl
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="departments"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {departments.map((department) => (
                <DepartmentCheckbox department={department} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default DepartmentSection
