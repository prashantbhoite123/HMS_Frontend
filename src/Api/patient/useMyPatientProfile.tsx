import { Patient } from "@/form/Patient/ProfileForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const useMyPatient = () => {
  const formDataToJson = (formData: FormData): Record<string, any> => {
    const obj: Record<string, any> = {}

    // Convert flat FormData keys into a nested object
    formData.forEach((value, key) => {
      const keys = key.split(".")
      keys.reduce((acc, part, index) => {
        if (index === keys.length - 1) {
          acc[part] = value
        } else {
          acc[part] = acc[part] || {}
        }
        return acc[part]
      }, obj)
    })

    return obj
  }
  const patientProfile = async (patientData: FormData): Promise<Patient> => {
    const jsonPayload = formDataToJson(patientData)
    const responce = await fetch(`${BACKEND_API_URL}/api/patient/patientPro`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPayload),
    })

    if (!responce.ok) {
      throw new Error("failed to store patiet information")
    }

    const data = await responce.json()
    if (data.success === false) {
      throw toast.error(data.message)
    }
    toast.success(data.message)
    return data
  }
  const { mutate: patientData, isLoading } = useMutation(patientProfile, {
    onSuccess: () => {
      console.log("patient information store successfuly")
    },
    onError: () => {
      toast.error("faild to store patient profile")
    },
  })

  return { patientData, isLoading }
}
