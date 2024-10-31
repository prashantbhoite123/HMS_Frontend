import { Appointment } from "@/components/Patient/AppinmetCard"
import { BACKEND_API_URL } from "@/main"
import { IAppointment } from "@/Types/appoinmentType"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "sonner"

// Hook to update an appointment
export const useUpdateApp = (appId: string) => {
  const queryClient = useQueryClient()

  const updateApp = async (updatedAppData: FormData): Promise<IAppointment> => {
    const response = await fetch(
      `${BACKEND_API_URL}/api/manappoinemt/update/${appId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppData),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update appointment")
    }

    const data = await response.json()
    toast.success(data.message)
    return data
  }

  const { mutate: updateAppointment, isLoading } = useMutation(updateApp, {
    onMutate: async (updatedAppData: FormData) => {
      await queryClient.cancelQueries("allAppoinment")

      // Snapshot the previous appointments
      const previousAppointments =
        queryClient.getQueryData<Appointment[]>("allAppoinment")

      // Optimistically update to new value
      queryClient.setQueryData<Appointment[]>("allAppoinment", (old) =>
        old
          ? old.map((app) =>
              app._id === appId ? { ...app, ...updatedAppData } : app
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

  return { updateAppointment, isLoading }
}

// Your other hooks remain unchanged...
