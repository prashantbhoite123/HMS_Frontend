import { BACKEND_API_URL } from "@/main"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

export const useMyDashData = () => {
  const getMydashData = async () => {
    console.log("api call")
    const response = await fetch(`${BACKEND_API_URL}/api/dash/dashdata`, {
      method: "GET",
      credentials: "include",
    })
    console.log("api back")
    if (!response.ok) {
      throw new Error("Failed to get dash Data")
    }

    const data = await response.json()

    console.log("this is dash data", data)
    return data
  }

  const {
    data: dashdata,
    isLoading,
    refetch,
  } = useQuery("Dashdata", getMydashData, {
    onSuccess: () => {
      console.log("dash data get successfully")
    },
    onError: () => {
      console.log("failed to get dash data")
    },
  })

  return { dashdata, isLoading, refetch }
}

export const useMyCacelAppoinment = (refetch: any) => {
  const cancelAppoinment = async (reson: string, appId: string) => {
    console.log(reson, appId)
    const responce = await fetch(
      `${BACKEND_API_URL}/api/dash/cancel/${appId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reson }),
      }
    )
    if (!responce.ok) {
      throw new Error("faild to cancel appoinment")
    }

    const data = await responce.json()
    toast.success(data.message)

    return data
  }
  const { mutate: cancelApp, isLoading } = useMutation(
    ({ reson, appId }: { reson: string; appId: string }) =>
      cancelAppoinment(reson, appId),
    {
      onSuccess: () => {
        console.log("appoinment cancel success")
        refetch()
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
  return { cancelApp, isLoading }
}

export const useMyScheduleAppoinment = (refetch: any) => {
  const scheduleAppoinment = async (appId: string) => {
    console.log(appId)
    const responce = await fetch(
      `${BACKEND_API_URL}/api/dash/schedule/${appId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    )
    if (!responce.ok) {
      throw new Error("faild to cancel appoinment")
    }

    const data = await responce.json()
    toast.success(data.message)

    return data
  }
  const { mutate: scheduleApp, isLoading } = useMutation(scheduleAppoinment, {
    onSuccess: () => {
      console.log("appoinment schedule success")
      refetch()
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return { scheduleApp, isLoading }
}
