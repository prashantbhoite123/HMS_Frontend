import { Appointment } from "@/form/Patient/Appoinment"
import { Appointment as apptype } from "@/components/Patient/AppinmetCard"
import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"

import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "sonner"
import { AppointmentForm } from "@/components/Patient/AppoinmentUpdate"
import { useNavigate } from "react-router-dom"

export const useMyAppoinment = (hospitalId: string) => {
  const navigate = useNavigate()
  const createAppoinment = async (
    appoinmentData: Appointment
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
      navigate("/successapp")
      return
    } else {
      toast.error(data.message)
    }
    return data
  }

  const { mutate: appoinment, isLoading } = useMutation(createAppoinment, {
    onError: () => {
      throw new Error("Error while creating appointment")
    },
    onSuccess: () => {
      console.log("Appointment successfully created")
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
    if (!response.ok) {
      throw new Error("Failed to get appointments")
    }

    const data = await response.json()
    return data
  }

  const {
    data: allAppoinment,
    isLoading,
    refetch,
  } = useQuery("allAppoinment", getallAppoinment, {
    onSuccess: () => {
      console.log("Fetched all appointments successfully")
    },
    onError: () => {
      console.log("Failed to get appointments")
    },
  })

  return { allAppoinment, isLoading, refetch }
}

export const useMydeleteApp = () => {
  const queryClient = useQueryClient() // Use a local queryClient instance

  const deleteAppoinment = async (appoinmentId: string) => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/delapp/${appoinmentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )

    if (!response.ok) {
      throw new Error("Failed to delete appointment")
    }

    const data = await response.json()
    toast.success(data.message)
    return appoinmentId
  }

  const { mutate: delApp, isLoading } = useMutation(deleteAppoinment, {
    onMutate: async (appId: string) => {
      await queryClient.cancelQueries("allAppoinment")

      const previousAppointments =
        queryClient.getQueryData<apptype[]>("allAppoinment")

      queryClient.setQueryData<apptype[]>("allAppoinment", (old) =>
        old ? old.filter((app) => app._id !== appId) : []
      )

      return { previousAppointments }
    },

    onError: (err, variables, context) => {
      if (context?.previousAppointments) {
        console.error(err, variables)

        queryClient.setQueryData("allAppoinment", context.previousAppointments)
      }
      toast.error("Failed to delete appointment")
    },

    onSuccess: () => {
      queryClient.invalidateQueries("allAppoinment")
      toast.success("Appointment deleted successfully")
    },
  })

  // export const useUpdateApp = (appId: string) => {
  //   const updateApp = async (updatedApp: FormData): Promise<Appointment> => {
  //     const responce = await fetch(
  //       `${BACKEND_API_URL}/api/manappoinemt/update/${appId}`,
  //       {
  //         method: "PUT",
  //         credentials: "include",
  //         body: JSON.stringify(updatedApp),
  //       }
  //     )

  //     if (!responce.ok) {
  //       throw new Error("Faild to update appoinment")
  //     }
  //     const data = await responce.json()
  //     toast.success(data.message)
  //     return data
  //   }
  //   const { mutate: updatedapp, isLoading } = useMutation(up)
  // }

  return { delApp, isLoading }
}

export const useUpdateApp = (appId: string, refetch: any) => {
  // const queryClient = useQueryClient()

  const updateApp = async (
    updatedAppoinment: AppointmentForm
  ): Promise<apptype> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/update/${appId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAppoinment),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update appointment")
    }

    const data = await response.json()
    toast.success(data.message)
    return data
  }

  const { mutate: updatedApp, isLoading } = useMutation(
    (updatedAppoinment: AppointmentForm) => updateApp(updatedAppoinment),
    {
      onError: () => {
        console.log("Error to updated appoinment")
      },

      onSuccess: () => {
        refetch()
        // queryClient.invalidateQueries("allAppoinment")
        toast.success("Appointment updated successfully")
      },
    }
  )

  return { updatedApp, isLoading }
}
