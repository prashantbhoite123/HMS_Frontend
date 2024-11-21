import { useUserSignIn } from "@/Api/common_Api/useMyhospitalApi"
import { useMyDoctorLogin } from "@/Api/Hospital/useMyDoctor"
import SigninUser from "@/form/Common_Form/SigninUser"

const SignIn = () => {
  const { signIn, isLoading } = useUserSignIn()
  const { DoctorSign, isLoading: doctorLoading } = useMyDoctorLogin()
  return (
    <div className="flex justify-center items-center gap-5">
      <SigninUser
        signInUser={signIn}
        doctorSignIn={DoctorSign}
        isLoading={isLoading || doctorLoading}
      />
    </div>
  )
}

export default SignIn
