import { BACKEND_API_URL } from "@/main"
import { SearchState } from "@/pages/Hospital_pages/HospitalsPage"
import { HospitalSearchResponse } from "@/Types/hospital"
import { useQuery } from "react-query"
import { toast } from "sonner"

export const useMyHospitalDetail = () => {
  const getallHospitals = async () => {
    const responce = await fetch(`${BACKEND_API_URL}/api/manage/gethospitals`, {
      method: "GET",
      credentials: "include",
    })

    if (!responce.ok) {
      throw new Error("Faild to get Hospitals")
    }
    const data = await responce.json()
    console.log("this is a data=====", data)
    return data
  }

  const { data: allHospitalData, isLoading } = useQuery(
    "getallHospital",
    getallHospitals,
    {
      onSuccess: () => {
        console.log("Hospital get success fully")
      },
      onError: () => {
        console.log("Error while get hospitals")
      },
    }
  )

  return { allHospitalData, isLoading }
}

export const useMySearchHospital = (searchState: SearchState) => {
  const createSearchRequest = async (): Promise<HospitalSearchResponse> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())
    params.set("selectedDept", searchState.selectedDept.join(","))
    const response = await fetch(
      `${BACKEND_API_URL}/api/manage/search/?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Faild to get hospital")
    }

    const data = await response.json()
    return data
  }
  const { data: result, isLoading } = useQuery(
    ["searchHospitals", searchState],
    createSearchRequest,
    { enabled: !!searchState }
  )

  return { result, isLoading }
}

export const useMygetHospital = (hospitalId: string) => {
  const getMyhospital = async () => {
    try {
      const responce = await fetch(
        `${BACKEND_API_URL}/api/manage/${hospitalId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
      if (!responce.ok) {
        throw new Error("Faild to get hospital")
      }

      const data = await responce.json()

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const {
    data: getHospital,
    isLoading,
    isError,
  } = useQuery(
    "getHospital",
    getMyhospital,

    {
      enabled: !!hospitalId,
      onError: () => {
        toast.error("faild to get hospital")
      },
    }
  )

  return { getHospital, isLoading, isError }
}
