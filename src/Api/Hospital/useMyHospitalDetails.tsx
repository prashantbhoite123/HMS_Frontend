import { BACKEND_API_URL } from "@/main"
import { HospitalSearchResponse } from "@/Types/hospital"
import { useQuery } from "react-query"

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

export const useMySearchHospital = (city?: string) => {
  const createSearchRequest = async (): Promise<HospitalSearchResponse> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manage/search/${city}`,
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
    ["searchHospitals"],
    createSearchRequest,
    { enabled: !!city }
  )

  return { result, isLoading }
}
