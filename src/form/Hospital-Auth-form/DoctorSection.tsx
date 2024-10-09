import { FormDescription, FormField, FormItem } from "@/components/ui/form"

import { useFieldArray, useFormContext } from "react-hook-form"
import DoctorMenuInput from "./DoctorMenuInput"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const DoctorSection = () => {
  const { control
   } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "doctors",
  })
  // const watchs = watch()

  // console.log("wahtch", watchs.doctors)
  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Doctor info</h2>
          <FormDescription>Add doctor information</FormDescription>
        </div>

        <FormField
          control={control}
          name="doctors"
          render={() => (
            <FormItem className="flex flex-col gap-5">
              
              {fields.map((_, index) => (
                <DoctorMenuInput
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              ))}
              <Separator />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={() =>
            append({
              doctorName: "",
              education: "",
              experienceYears: 0,
              specialization: "",
              workingHours: 0,
            })
          }
        >
          Add Doctor
        </Button>
      </div>
    </>
  )
}

export default DoctorSection
