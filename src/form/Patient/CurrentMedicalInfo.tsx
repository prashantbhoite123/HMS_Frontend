import FormInput from "../Common_Form/FormInput"

const CurrentMedicalInfo = () => {
  return (
    <>
      <FormInput
        placeholder="reasonForVisit"
        label="ReasonForVisit"
        name="currentMedicalInfo.reasonForVisit"
        type="text"
      />
      <FormInput
        placeholder="symptoms"
        label="Symptoms"
        name="currentMedicalInfo.symptoms"
        type="text"
      />
      <FormInput
        placeholder="bloodPressure"
        label="BloodPressure"
        name="currentMedicalInfo.vitalSigns.bloodPressure"
        type="text"
      />
      <FormInput
        placeholder="heartRate"
        label="HeartRate"
        name="currentMedicalInfo.vitalSigns.heartRate"
        type="text"
      />
      <FormInput
        placeholder="weight"
        label="Weight"
        name="currentMedicalInfo.vitalSigns.weight"
        type="text"
      />
    </>
  )
}

export default CurrentMedicalInfo
