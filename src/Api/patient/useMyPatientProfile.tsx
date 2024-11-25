import { Patient } from "@/form/Patient/ProfileForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useMyPatient = () => {
  const navigate = useNavigate()
  const formDataToJson = (formData: FormData): Record<string, any> => {
    const obj: Record<string, any> = {}

    formData.forEach((value, key) => {
      const keys = key.replace(/\[(\w+)]/g, ".$1").split(".")
      keys.reduce((acc, part, index) => {
        if (index === keys.length - 1) {
          acc[part] = value
        } else {
          acc[part] = acc[part] || (isNaN(Number(keys[index + 1])) ? {} : [])
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
    if (!data.success) {
      toast.error(data.message)
      throw toast.error(data.message)
    }
    toast.success(data.message)
    navigate("/")
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

export const useMyPatientInfo = () => {
  const getMyPatientInfo = async () => {
    const responce = await fetch(`${BACKEND_API_URL}/api/patient/getpatient`, {
      method: "GET",
      credentials: "include",
    })

    if (!responce.ok) {
      throw new Error("failed to get Patient Info")
    }
    return responce.json()
  }

  const { data: getpatient, isLoading } = useQuery(
    "getMyPatientInfo",
    getMyPatientInfo,
    {
      onSuccess: () => {
        console.log("successfully get patientData")
      },
      onError: () => {
        console.log("failed to get patient data")
      },
    }
  )

  return { getpatient, isLoading }
}
