import { Appointment } from "@/form/Patient/Appoinment"
import { Appointment as apptype } from "@/components/Patient/AppinmetCard"
import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"

import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "sonner"
import { AppointmentForm } from "@/components/Patient/AppoinmentUpdate"

export const useMyAppoinment = (hospitalId: string) => {
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

    return response.json()
  }

  const { data: allAppoinment, isLoading } = useQuery(
    "allAppoinment",
    getallAppoinment,
    {
      onSuccess: () => {
        console.log("Fetched all appointments successfully")
      },
      onError: () => {
        console.log("Failed to get appointments")
      },
    }
  )

  return { allAppoinment, isLoading }
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

export const useUpdateApp = (appId: string) => {
  const queryClient = useQueryClient()

  const updateApp = async (updatedApp: AppointmentForm): Promise<apptype> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/update/${appId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedApp),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update appointment")
    }

    const data = await response.json()
    toast.success(data.message)
    return data
  }

  const { mutate: updatedApp, isLoading } = useMutation(updateApp, {
    onMutate: async (newApp) => {
      await queryClient.cancelQueries("allAppoinment")

      const previousAppointments =
        queryClient.getQueryData<apptype[]>("allAppoinment")

      queryClient.setQueryData<apptype[]>("allAppoinment", (old) =>
        old
          ? old.map((app) =>
              app._id === appId
                ? ({
                    ...app,
                    ...newApp,
                    appointmentDate: new Date(newApp.appointmentDate),
                  } as apptype)
                : app
            )
          : []
      )

      return { previousAppointments }
    },

    onError: (err, variables, context) => {
      console.log(err, variables)
      if (context?.previousAppointments) {
        queryClient.setQueryData("allAppoinment", context.previousAppointments)
      }
      toast.error("Failed to update appointment")
    },

    onSuccess: () => {
      queryClient.invalidateQueries("allAppoinment")
      toast.success("Appointment updated successfully")
    },
  })

  return { updatedApp, isLoading }
}
