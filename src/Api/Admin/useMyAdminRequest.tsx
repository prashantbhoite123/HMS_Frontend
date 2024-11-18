import { BACKEND_API_URL } from "@/main"
import { useQuery } from "react-query"

export const useMyRequestedHospital = () => {
  const getMyRequestHos = async () => {
    try {
      const responce = await fetch(
        `${BACKEND_API_URL}/api/approvel/aprovelhos`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      if (!responce) {
        throw new Error("failed to get admin hospital")
      }

      const data = await responce.json()
      return data
    } catch (error) {
      throw new Error("Failed to get Requested hospital ")
    }
  }

  const { data: requestedHospital, isLoading } = useQuery(
    "requestedHos",
    getMyRequestHos,
    {
      onSuccess: () => {
        console.log("success")
      },
      onError: () => {
        console.log("Error")
      },
    }
  )
  return { requestedHospital, isLoading }
}
