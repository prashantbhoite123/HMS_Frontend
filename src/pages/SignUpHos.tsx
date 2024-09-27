import { useHospitalRegistration } from "@/Api/MyhospitalApi"
import HospitalSignUp from "@/form/Hospital-Auth-form/HospitalSignUp"
const SignUpHos = () => {
  const { registerhospital, isLoading } = useHospitalRegistration()
  return (
    <>
      <div className="h-auto md:h-screen flex justify-center items-center gap-5">
        <HospitalSignUp
          createHospital={registerhospital}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

export default SignUpHos
