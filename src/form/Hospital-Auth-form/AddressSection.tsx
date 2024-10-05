import { FormDescription } from "@/components/ui/form"
import FormInput from "../Common_Form/FormInput"

const AddressSection = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Address</h2>
        <FormDescription>Add doctor information</FormDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 py-3  gap-y-2 md:gap-5">
        <FormInput
          label="City"
          name="address.city"
          placeholder="Enter your city"
        />
        <FormInput
          label="State"
          name="address.state"
          placeholder="Enter your state"
        />
        <FormInput
          label="Country"
          name="address.country"
          placeholder="Enter your country"
        />
      </div>
    </>
  )
}

export default AddressSection
