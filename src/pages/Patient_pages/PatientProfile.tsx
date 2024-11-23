import ProfileForm from "@/form/Patient/ProfileForm"
// import doctorPatient from "../../assets/doctorPatient.png"
import madicine from "../../assets/doctorimage.png"
import "../../App.css"
import { useMyPatient } from "@/Api/patient/useMyPatientProfile"
const PatientProfile = () => {
  const { patientData, isLoading } = useMyPatient()
  return (
    <div className="shadow-xl shadow-slate-700 h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="overflow-y-auto h-full p-4 scrollbar-hide">
          <ProfileForm patientData={patientData} loading={isLoading} />
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
