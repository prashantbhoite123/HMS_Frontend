import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"
import { useMutation } from "react-query"
import { toast } from "sonner"

export const useMyAppoinment = (hospitalId: string) => {
  const createAppoinment = async (
    appoinmentData: FormData
  ): Promise<IAppointment | undefined> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/appoinment/${hospitalId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appoinmentData),

        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Something went wrong")
    }
    const data = await response.json()
    if (data.success === true) {
      toast.success(data.message)
      return
    } else {
      toast.error(data.message)
    }
    return data
  }
  const { mutate: appoinment, isLoading } = useMutation(createAppoinment, {
    onError: () => {
      throw new Error("Error while createAppoinments")
    },
    onSuccess: () => {
      console.log("Appoinmnt success fully created")
    },
  })

  return { appoinment, isLoading }
}
