import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

export const useMyAppoinment = (hospitalId: string) => {
  const createAppoinment = async (
    appoinmentData: FormData
  ): Promise<IAppointment | undefined> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/appoinment/${hospitalId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appoinmentData),

        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Something went wrong")
    }
    const data = await response.json()
    if (data.success === true) {
      toast.success(data.message)
      return
    } else {
      toast.error(data.message)
    }
    return data
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

export const useMyallAppoinment = () => {
  const getallAppoinment = async () => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/appoinment/getallappinment`,
      {
        method: "GET",
        credentials: "include",
      }
    )
    if (!response) {
      throw new Error("faild to get appoinment")
    }

    return response.json()
  }
  const { data: allAppoinment, isLoading } = useQuery(
    "allAppoinment",
    getallAppoinment,
    {
      onSuccess: () => {
        console.log("all appoinment get successFuly")
      },
      onError: () => {
        console.log("faild to get appoinment")
      },
    }
  )
  return { allAppoinment, isLoading }
}

export const useMydeleteApp = () => {
  const deleteAppoinment = async (appoinmentId: string) => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/delapp/${appoinmentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("faild to delete apponment")
    }

    const data = await response.json()
    toast.success(data.message)
    return data
  }

  const { mutate: delApp, isLoading } = useMutation(deleteAppoinment, {
    onSuccess: () => {
      console.log("appoinment delete successfull")
    },
    onError: () => {
      console.log("Faild to delete appoinment")
    },
  })

  return { delApp, isLoading }
}
