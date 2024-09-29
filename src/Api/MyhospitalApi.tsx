import { RegisterHos } from "@/types"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

console.log(API_BASE_URL)
export const useHospitalRegistration = () => {
  const naviagate = useNavigate()
  const registerHospital = async (
    registrationData: FormData
  ): Promise<RegisterHos> => {
    const fromDataObj = Object.fromEntries(registrationData.entries())

    console.log("fromDataObj", fromDataObj)

    const responce = await fetch(`${API_BASE_URL}/api/hospital/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromDataObj),
    })

    if (!responce.ok) {
      throw new Error("Faild to register hospital")
    }

    const data = await responce.json()

    return data
  }

  const { mutate: registerhospital, isLoading } = useMutation(
    registerHospital,
    {
      onSuccess: () => {
        toast.success(" Registration Successfully")
        naviagate("/")
      },
      onError: () => {
        toast.error("Error while registration")
      },
    }
  )

  return { registerhospital, isLoading }
}
