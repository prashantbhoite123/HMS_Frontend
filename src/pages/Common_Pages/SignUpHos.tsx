import { useHospitalRegistration } from "@/Api/common_Api/useMyhospitalApi"
import { useUser } from "@/context/userContext"
import HospitalSignUp from "@/form/Common_Form/HospitalSignUp"

import { useLocation } from "react-router-dom"
const SignUpHos = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const role = searchParams.get("role") || "patient"
  
  const { currentUser } = useUser()

  console.log("this is ==========", currentUser)

  const { registerhospital, isLoading } = useHospitalRegistration()
  return (
    <>
      <div className="h-auto  md:h-screen  flex justify-center items-center gap-5">
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
