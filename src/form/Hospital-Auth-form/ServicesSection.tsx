import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { services } from "@/config/HospitalData"
import { useFormContext } from "react-hook-form"
import ServicesCheckBox from "./ServicesCheckBox"
function ServicesSection() {
  const { control } = useFormContext()
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Services</h2>
        <FormDescription>
          Select the services that your hospiatal
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {services.map((service) => (
                <ServicesCheckBox service={service} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ServicesSection
