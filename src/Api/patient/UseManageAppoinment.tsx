import { BACKEND_API_URL } from "@/main"
import { searchState } from "@/pages/Patient_pages/MyAppoinment"
import { AppoinmentSearchResponse } from "@/Types/appoinmentType"
import { useQuery } from "react-query"

export const useMysearchAppoinment = (searchState: searchState) => {
  const createSearchRequest = async (): Promise<AppoinmentSearchResponse> => {
    const params = new URLSearchParams()
    if (searchState.searchQuery) {
      params.set("searchQuery", searchState.searchQuery)
    }
    params.set("page", searchState.page.toString())

    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/search/?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("search Request failed")
    }

    const data = await response.json()

    console.log("searech data", data)

    return data
  }

  const {
    data: result,
    isLoading,
    refetch,
  } = useQuery(["searchAppoinments", searchState], createSearchRequest, {
    onSuccess: () => {
      console.log("search success")
    },
    onError: () => {
      console.log("Error while searchAPi frontend")
    },
  })

  return {
    result,
    isLoading,
    refetch,
  }
}
