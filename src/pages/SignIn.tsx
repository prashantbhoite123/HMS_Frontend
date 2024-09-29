import SigninUser from "@/form/Hospital-Auth-form/SigninUser"

import { useUserSignIn } from "@/Api/MyhospitalApi"

const SignIn = () => {
  const { signIn, isLoading } = useUserSignIn()
  return (
    <div className="h-auto md:h-screen flex justify-center items-center gap-5">
      <SigninUser signInUser={signIn} isLoading={isLoading} />
    </div>
  )
}

export default SignIn
