import { useUser } from "@/context/userContext"
import { SignInFormData } from "@/form/Common_Form/AdminSigninForm"
import { BACKEND_API_URL } from "@/main"
import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useMyAdminApi = () => {
  const navigate = useNavigate()
  const adminsign = async (adminFormData: SignInFormData) => {
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

export const useMyResendOtp = () => {
  const [otpExpiry, setOtpExpiry] = useState(null)
  const resendOtp = async () => {
    const responce = await fetch(`${BACKEND_API_URL}/api/admin/resendotp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: import.meta.env.VITE_ADMIN_EMAIL,
      }),
    })
    if (!responce) {
      throw new Error("Faild to rensend otp")
    }

    const data = await responce.json()

    if (data.success === false) {
      return toast.error(data.message)
    }

    toast.success(data.message)
    return data
  }
  const { mutate: otpresend, isLoading } = useMutation(resendOtp, {
    onSuccess: (data: any) => {
      console.log("OTP resend successfull")
      console.log("OTP resend expirytime", data.otpExpiry)
      setOtpExpiry(data?.otpExpiry)
    },
    onError: (error) => {
      console.log("failed to resend otp", error)
    },
  })

  return { otpresend, isLoading, otpExpiry }
}
