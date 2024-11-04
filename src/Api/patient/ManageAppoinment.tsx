import { searchState } from "@/pages/Patient_pages/MyAppoinment"
import { AppoinmentSearchResponse } from "@/Types/appoinmentType"
import { useQuery } from "react-query"

export const useMysearchAppoinment = (searchState: searchState) => {
  const createSearchRequest = async (): Promise<AppoinmentSearchResponse> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())

    const response = await fetch(`/api/manappoinemt/search/${params}`, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("search Request failed")
    }

    return response.json()
  }

  const { data: result, isLoading } = useQuery(
    ["searchAppoinments", searchState],
    createSearchRequest,
    {
      onSuccess: () => {
        console.log("search success")
      },
      onError: () => {
        console.log("Error while searchAPi frontend")
      },
    }
  )

  return {
    result,
    isLoading,
  }
}
