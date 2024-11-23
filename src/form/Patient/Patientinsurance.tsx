import FormInput from "../Common_Form/FormInput"

function Patientinsurance() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Insurance Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          placeholder="Provider"
          label="Insurance Provider"
          name="insurance.provider"
          type="text"
        />
        <FormInput
          placeholder="Policy Number"
          label="Policy Number"
          name="insurance.policyNumber"
          type="text"
        />
      </div>
    </div>
  )
}

export default Patientinsurance
