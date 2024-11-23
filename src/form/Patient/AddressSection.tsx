import FormInput from "../Common_Form/FormInput"

const AddressSection = () => {
  return (
    <>
      <div className="p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput placeholder="City" name="address.city" label="City" />
          <FormInput placeholder="State" name="address.state" label="State" />
          <FormInput
            placeholder="Country"
            name="address.country"
            label="Country"
          />
        </div>
      </div>
    </>
  )
}

export default AddressSection
