import { BACKEND_API_URL } from "@/main"
import { useQuery } from "react-query"

export const useMyDashData = () => {
  const getMydashData = async () => {
    const response = await fetch(`${BACKEND_API_URL}/api/dash/dashdata`, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to get dash Data")
    }

    const data = await response.json()

    console.log("this is dash data")
    return data
  }

  const { data: dashdata, isLoading } = useQuery("Dashdata", getMydashData, {
    onSuccess: () => {
      console.log("dash data get successfully")
    },
    onError: () => {
      console.log("failed to get dash data")
    },
  })

  return { dashdata, isLoading }
}
