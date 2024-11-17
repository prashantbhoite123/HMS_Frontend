import { doctors } from "@/form/Hospital-Auth-form/Doctors/DoctorsForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const useMyDoctorRegister = () => {
  const registerDoctor = async (doctorData: FormData): Promise<doctors> => {
    const responce = await fetch(`${BACKEND_API_URL}/api/doctor/register`, {
      method: "POST",
      credentials: "include",

      body: doctorData,
    })

    if (!responce) {
      throw new Error("failed to register doctor")
    }

    const data = await responce.json()
    if (data.success === false) {
      throw toast.error(data.message)
    }

    toast.success(data.message)
    return data
  }

  const { mutate: doctorRegister, isLoading } = useMutation(registerDoctor, {
    onSuccess: () => {
      console.log("Doctor register successful")
    },
    onError: () => {
      console.error("failed to register doctor")
    },
  })
  return { doctorRegister, isLoading }
}
