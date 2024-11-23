import FormInput from "../Common_Form/FormInput"

const EmergencyContact = () => {
  return (
    <>
      <div className=" p-4  rounded-md ">
        <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            placeholder="Name"
            label="Emergency Contact Name"
            name="emergencyContact.name"
          />
          <FormInput
            placeholder="Relation"
            label="Relation"
            name="emergencyContact.relation"
          />
          <FormInput
            placeholder="Phone"
            label="Emergency Contact Phone"
            name="emergencyContact.phone"
          />
        </div>
      </div>
    </>
  )
}

export default EmergencyContact
