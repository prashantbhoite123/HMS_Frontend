import { RegisterHos } from "@/types"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const useHospitalRegistration = () => {
  const registerHospital = async (
    registrationData: FormData
  ): Promise<RegisterHos> => {
    for (let [key, value] of registrationData.entries()) {
      console.log(` api values ${key}`, value)
    }
    const responce = await fetch("/api/hospital/signup", {
      method: "POST",

      body: JSON.stringify(registrationData),
    })

    if (!responce.ok) {
      throw new Error("Faild to register hospital")
    }
    const data = await responce.json()

    console.log("responce", data)
    return data
  }

  const { mutate: registerhospital, isLoading } = useMutation(
    registerHospital,
    {
      onSuccess: () => {
        toast.success("Hospital Registar Successfully")
      },
      onError: () => {
        toast.error("Error while register hospital")
      },
    }
  )

  return { registerhospital, isLoading }
}
