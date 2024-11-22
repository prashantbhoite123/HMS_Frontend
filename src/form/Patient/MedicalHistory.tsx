import FormInput from "../Common_Form/FormInput"

const MedicalHistory = () => {
  return (
    <>
      <FormInput
        placeholder="allergies"
        name="medicalHistory.allergies"
        label="allergies"
        type="text"
      />
      <FormInput
        placeholder="chronicConditions"
        name="medicalHistory.chronicConditions"
        label="chronicConditions"
        type="text"
      />
      <FormInput
        placeholder="pastSurgeries"
        name="medicalHistory.pastSurgeries"
        label="PastSurgeries"
        type="text"
      />
      <FormInput
        placeholder="currentMedications"
        name="medicalHistory.currentMedications"
        label="CurrentMedications"
        type="text"
      />
    </>
  )
}

export default MedicalHistory
