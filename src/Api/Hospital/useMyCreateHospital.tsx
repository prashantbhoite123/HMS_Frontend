import { IHospital } from "@/Types/hospital"
import { BACKEND_API_URL } from "../../main"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

export const useGetHospital = () => {
  const getHospital = async (): Promise<IHospital> => {
    console.log(`object`)
    const responce = await fetch(
      `${BACKEND_API_URL}/api/my/hospital/gethospital`,
      {
        method: "GET",
        credentials: "include",
      }
    )

    if (!responce.ok) {
      // toast.error("Hospital not found")
      throw new Error("failed to get hospital api")
    }

    const data = await responce.json()
    console.log("this is a data===", data)
    return data
  }

  const {
    data: hospital,
    isLoading,
    refetch,
  } = useQuery("gethospital", getHospital)

  return { hospital, isLoading, refetch }
}

export const usecreateHospital = () => {
  const createHospital = async (
    createHospitalFormData: FormData
  ): Promise<IHospital | undefined> => {
    for (let [key, value] of createHospitalFormData.entries()) {
      console.log("formadata ==", key, value)
    }
    try {
      const responce = await fetch(
        `${BACKEND_API_URL}/api/my/hospital/createhospital`,
        {
          method: "POST",
          body: createHospitalFormData,
          credentials: "include",
        }
      )

      const data = await responce.json()
      if (data.success === false) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
      }
      console.log("Responce Hotel create ime: ", data)
      return data
    } catch (error) {
      console.log(`Error while create hospital api ${error}`)
    }
  }
  const { mutate: createHospitaldata, isLoading } = useMutation(
    createHospital,
    {
      onError: () => {
        toast.error("Faild to create hospital")
      },
      onSuccess: () => {
        console.log("Hospital create success full")
      },
    }
  )
  return { createHospitaldata, isLoading }
}

export const useUpdateMyHospital = (refetch: any) => {
  const updateHospitalApi = async (
    updateHospitalFormData: FormData
  ): Promise<IHospital> => {
    for (let [key, value] of updateHospitalFormData.entries()) {
      console.log("Update formadata ==", key, value)
    }

    const responce = await fetch(
      `${BACKEND_API_URL}/api/my/hospital/updatehospital`,
      {
        method: "PUT",
        credentials: "include",
        body: updateHospitalFormData,
      }
    )

    if (!responce.ok) {
      throw new Error(`Faild to update Hospital`)
    }

    const data = await responce.json()
    // console.log("this a data=====", data)
    return data
  }

  const { mutate: updateHospital, isLoading } = useMutation(updateHospitalApi, {
    onSuccess: () => {
      refetch()
      toast.success("Hospital update Successfull")
    },
    onError: () => {
      toast.error("Faild to update hospital")
    },
  })

  return { updateHospital, isLoading }
}
