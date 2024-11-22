import FormInput from "../Common_Form/FormInput"

const EmergencyContact = () => {
  return (
    <>
      <FormInput placeholder="name" name="emergencyContact.name" label="Name" />
      <FormInput
        placeholder="relation"
        name="emergencyContact.relation"
        label="Relation"
      />
      <FormInput
        placeholder="phone"
        name="emergencyContact.phone"
        label="Phone"
      />
    </>
  )
}

export default EmergencyContact
