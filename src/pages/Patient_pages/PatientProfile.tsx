import ProfileForm from "@/form/Patient/ProfileForm"

import madicine from "../../assets/doctorimage.png"
import "../../App.css"
import {
  useMyPatient,
  useMyPatientInfo,
  useMyPatientProfileUpdate,
} from "@/Api/patient/useMyPatientProfile"
const PatientProfile = () => {
  const { patientData, isLoading } = useMyPatient()
  const {
    getpatient,
    isLoading: patientInfoLoading,
    refetch,
  } = useMyPatientInfo()
  console.log(patientInfoLoading)
  const { updateProfile, isLoading: updateLoading } =
    useMyPatientProfileUpdate(refetch)

  const isEditing = !!patientData

  return (
    <div className="shadow-xl shadow-slate-700 h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="overflow-y-auto h-full p-4 scrollbar-hide">
          <ProfileForm
            patientInfo={getpatient}
            patientData={isEditing ? updateProfile : patientData}
            loading={isLoading || updateLoading}
          />
        </div>

        <div className="hidden md:block sticky top-0 h-screen p-4">
          <img
            src={madicine}
            alt="Doctor and Patient"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
