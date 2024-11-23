import FormInput from "../Common_Form/FormInput"

const MedicalHistory = () => {
  return (
    <>
      <div className=" p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Medical History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            placeholder="Allergies"
            label="Allergies"
            name="medicalHistory.allergies"
            type="text"
          />
          <FormInput
            placeholder="Chronic Conditions"
            label="Chronic Conditions"
            name="medicalHistory.chronicConditions"
            type="text"
          />
          <FormInput
            placeholder="Past Surgeries"
            label="Past Surgeries"
            name="medicalHistory.pastSurgeries"
            type="text"
          />
          <FormInput
            placeholder="Current Medications"
            label="Current Medications"
            name="medicalHistory.currentMedications"
            type="text"
          />
        </div>
      </div>
    </>
  )
}

export default MedicalHistory
