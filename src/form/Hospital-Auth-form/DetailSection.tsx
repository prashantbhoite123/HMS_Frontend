import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormInput from "../Common_Form/FormInput"
import { Controller } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import FormSelect from "../Common_Form/FormSelect"

function DetailSection() {
  return (
    <div className="space-y-8 ">
      <div className="">
        <h2 className="text-lg font-bold">Hospital Details</h2>
        <FormDescription>
          Enetr the details about your restaurant
        </FormDescription>
      </div>
      <div className="grid grid-cols-2 p-4 gap-5 text-black">
        <FormInput
          label="Hospital Name"
          name="hospitalName"
          type="text"
          placeholder="enter hospital name"
        />
        <FormInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="enter phone number"
        />
        <FormSelect
          label="Hospital Type"
          name="hospitalType"
          options={[
            { value: "general", label: "General Hospital" },
            { value: "specialized", label: "Specialized Hospital" },
            { value: "clinic", label: "Clinic" },
            { value: "rehabilitation", label: "Rehabilitation Center" },
          ]}
        />

        <FormInput
          label="Hospital Name"
          name="hospitalName"
          placeholder="enter hospital name"
        />
        <Controller
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="rounded-[5px] focus:outline-cyan-600 text-slate-300"
                  autoFocus
                />
              </FormControl>

              <FormMessage className="text-red-600"></FormMessage>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default DetailSection
