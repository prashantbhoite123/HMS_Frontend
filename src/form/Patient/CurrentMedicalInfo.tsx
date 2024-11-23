import FormInput from "../Common_Form/FormInput"

const CurrentMedicalInfo = () => {
  return (
    <>
      <div className=" p-4 rounded-md ">
        <h2 className="text-lg font-semibold mb-4">
          Current Medical Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            placeholder="Reason for Visit"
            label="Reason for Visit"
            name="currentMedicalInfo.reasonForVisit"
            type="text"
          />
          <FormInput
            placeholder="Symptoms"
            label="Symptoms"
            name="currentMedicalInfo.symptoms"
            type="text"
          />
          <FormInput
            placeholder="Blood Pressure"
            label="Blood Pressure"
            name="currentMedicalInfo.vitalSigns.bloodPressure"
            type="text"
          />
          <FormInput
            placeholder="Heart Rate"
            label="Heart Rate"
            name="currentMedicalInfo.vitalSigns.heartRate"
            type="text"
          />
          <FormInput
            placeholder="Weight"
            label="Weight"
            name="currentMedicalInfo.vitalSigns.weight"
            type="text"
          />
        </div>
      </div>
    </>
  )
}

export default CurrentMedicalInfo
