import ProfileForm from "@/form/Patient/ProfileForm"
// import doctorPatient from "../../assets/doctorPatient.png"
import madicine from "../../assets/doctorimage.png"
const PatientProfile = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 p-4">
      <ProfileForm />
      <div className="hidden md:block sticky  top-36 bottom-10 h-[calc(100vh-2rem)]">
        <img
          src={madicine}
          alt="Doctor and Patient"
          className="w-full h-[95vh] rounded-md"
        />
      </div>
    </div>
  )
}

export default PatientProfile
