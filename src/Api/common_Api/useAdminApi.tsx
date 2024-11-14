import { SignInFormData } from "@/form/Common_Form/AdminSigninForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

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
      throw new Error("Faild to sign admin")
    }

    const data = await responce.json()
    if (data.success === true) {
      navigate("/otppage")
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
