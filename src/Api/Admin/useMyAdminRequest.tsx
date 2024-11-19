import { BACKEND_API_URL } from "@/main"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

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

export const useMyRejectHospital = (hospitalId: string) => {
  const hospitalRejectApi = async (reson: string) => {
    const responce = await fetch(
      `${BACKEND_API_URL}/api/approvel/rejected/${hospitalId as string}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reson),
      }
    )
    if (!responce.ok) {
      throw new Error("failed to Reject user")
    }

    const data = await responce.json()
    if (data.status === false) {
      return toast.error(data.message)
    }

    toast.success(data.message)
    return data
  }

  const { mutate: rejectionHos, isLoading } = useMutation(hospitalRejectApi, {
    onSuccess: () => {
      console.log("hospital rejected successful")
    },
    onError: () => {
      console.log("error to hospital rejection ")
    },
  })

  return { rejectionHos, isLoading }
}
