import { useHospitalRegistration } from "@/Api/MyhospitalApi"
import HospitalSignUp from "@/form/Hospital-Auth-form/HospitalSignUp"
import { useLocation } from "react-router-dom"
const SignUpHos = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const role = searchParams.get("role") || "petient"

  const { registerhospital, isLoading } = useHospitalRegistration()
  return (
    <>
      <div className="h-auto md:h-screen flex justify-center items-center gap-5">
        <HospitalSignUp
          createHospital={registerhospital}
          isLoading={isLoading}
          role={role}
        />
      </div>
    </>
  )
}

export default SignUpHos