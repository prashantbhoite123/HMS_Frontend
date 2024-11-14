import { useUser } from "@/context/userContext"
import { SignInFormData } from "@/form/Common_Form/AdminSigninForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useMyAdminApi = () => {
  const navigate = useNavigate()
  const adminsign = async (adminFormData: SignInFormData) => {
    console.log("this is admin data", adminFormData)
    const responce = await fetch(`${BACKEND_API_URL}/api/admin/adminsign`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminFormData),
    })
    if (!responce) {
      toast.error("faild to admin sign in")
      throw new Error("Faild to sign admin")
    }

    const data = await responce.json()
    console.log("this is admin data", data)
    if (data.success === true) {
      toast.success(data.message)
      navigate(`/otppage?tab=${data.otpExpiry}`)
    }

    return data
  }
  const { mutate: adminData, isLoading } = useMutation(adminsign, {
    onSuccess: () => {
      console.log("admin data correct ")
    },
    onError: () => {
      console.log("faild to admin sign ")
    },
  })

  return { adminData, isLoading }
}

export const useMyVarifyOtp = () => {
  console.log(import.meta.env.VITE_ADMIN_EMAIL)
  const navigate = useNavigate()
  const { saveUserToSession } = useUser()
  const otpVarification = async (otp: any) => {
    const responce = await fetch(`${BACKEND_API_URL}/api/admin/varifyotp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: import.meta.env.VITE_ADMIN_EMAIL,
        otp: Number(otp),
      }),
    })
    if (!responce) {
      throw new Error("failed to sign admin")
    }

    const data = await responce.json()
    if (data.success === true) {
      toast.success(data.message)
      saveUserToSession(data.rest)
      navigate("/")
    }

    return data
  }

  const { mutate: varifyOtp, isLoading } = useMutation(otpVarification, {
    onSuccess: () => {
      console.log("admin login successfull")
    },
    onError: () => {
      console.log("faild to login admin")
    },
  })

  return { varifyOtp, isLoading }
}

export const useMyResendOtp = () => {}
