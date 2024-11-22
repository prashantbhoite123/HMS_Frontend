import FormInput from "../Common_Form/FormInput"

const AddressSection = () => {
  return (
    <>
      <FormInput placeholder="city" name="address.city" label="City" />
      <FormInput placeholder="state" name="address.state" label="State" />
      <FormInput placeholder="country" name="address.country" label="Country" />
    </>
  )
}

export default AddressSection
