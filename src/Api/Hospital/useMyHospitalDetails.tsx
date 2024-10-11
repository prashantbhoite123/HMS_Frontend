import { BACKEND_API_URL } from "@/main"
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
