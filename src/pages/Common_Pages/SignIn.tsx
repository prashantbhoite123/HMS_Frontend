import { useUserSignIn } from "@/Api/common_Api/useMyhospitalApi"
import SigninUser from "@/form/Common_Form/SigninUser"

const SignIn = () => {
  const { signIn, isLoading } = useUserSignIn()
  return (
    <div className="flex justify-center items-center gap-5">
      <SigninUser signInUser={signIn} isLoading={isLoading} />
    </div>
  )
}

export default SignIn
