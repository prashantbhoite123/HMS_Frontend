import { IHospital } from "@/Types/hospital"
import { BACKEND_API_URL } from "../../main"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const usecreateHospital = () => {
  const createHospital = async (
    createHospitalFormData: FormData
  ): Promise<IHospital | undefined> => {
    for (let [key, value] of createHospitalFormData.entries()) {
      console.log("formadata ==", key, value)
    }
    try {
      const responce = await fetch(
        `${BACKEND_API_URL}/api/my/hospital/createhospital`,
        {
          method: "POST",
          body: createHospitalFormData,
          credentials: "include",
        }
      )
      if (!responce.ok) {
        throw new Error("Faild to create hospital")
      }

      const data = await responce.json()
      console.log("Responce Hotel create ime: ", data)
      return data
    } catch (error) {
      console.log(`Error while create hospital api ${error}`)
    }
  }
  const { mutate: createHospitaldata, isLoading } = useMutation(
    createHospital,
    {
      onError: () => {
        toast.error("Faild to create hospital")
      },
      onSuccess: () => {
        toast.success("Hospital create success fully")
      },
    }
  )
  return { createHospitaldata, isLoading }
}
