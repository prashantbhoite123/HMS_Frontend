import { Button } from "@/components/ui/button"
import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { useFieldArray, useFormContext } from "react-hook-form"
import VisiteInput from "./VisiteInput"

const VisitHistory = () => {
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "visitHistory",
  })

  return (
    <>
      <div className="p-4">
        <div>
          <h2 className=" text-lg font-semibold ">Visite History</h2>
          <FormDescription className="mb-4">
            Create your visite history details
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="visitHistory"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <VisiteInput
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />
        <Button
          type="button"
          className="mt-4 bg-gradient-to-r from-indigo-600 to-pink-600"
          onClick={() =>
            append({
              lastVisitDate: "",
              assignedDoctor: "",
              lastVisitReason: "",
            })
          }
        >
          Add details
        </Button>
      </div>
    </>
  )
}

export default VisitHistory
