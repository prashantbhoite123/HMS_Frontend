import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"
import { useMutation } from "react-query"

export const useMyAppoinment = () => {
  const createAppoinment = async (
    appoinmentData: FormData
  ): Promise<IAppointment | undefined> => {
    for (let [key, value] of appoinmentData.entries()) {
      console.log(`Appoinment data ${key}:${value}`)
    }
    const response = await fetch(`${BACKEND_API_URL}/api/appoinment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appoinmentData),

      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return response.json()
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
