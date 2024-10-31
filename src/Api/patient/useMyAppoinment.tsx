import { Appointment } from "@/components/Patient/AppinmetCard"
import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "sonner"

// Hook to create an appointment
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
      throw new Error("Error while creating appointment")
    },
    onSuccess: () => {
      console.log("Appointment successfully created")
    },
  })

  return { appoinment, isLoading }
}

// Hook to fetch all appointments
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

// Hook to delete an appointment with optimistic update
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
    return appoinmentId // Return the ID for optimistic updates
  }

  const { mutate: delApp, isLoading } = useMutation(deleteAppoinment, {
    onMutate: async (appId: string) => {
      await queryClient.cancelQueries("allAppoinment")

      const previousAppointments =
        queryClient.getQueryData<Appointment[]>("allAppoinment")

      queryClient.setQueryData<Appointment[]>("allAppoinment", (old) =>
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

  // export const useUpdateApp = () => {
  //   const updateApp = () => {
  //     const responce = await fetch(`${BACKEND_API_URL}/`)
  //   }
  // }

  return { delApp, isLoading }
}
