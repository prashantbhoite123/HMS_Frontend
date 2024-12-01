// import { doctors } from "@/form/Hospital-Auth-form/Doctors/DoctorsForm"
import { useUser } from "@/context/userContext"
import { doctors } from "@/form/Hospital-Auth-form/Doctors/DoctorsForm"
import { BACKEND_API_URL } from "@/main"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useMyDoctorRegister = (hospitalId: string) => {
  const registerDoctor = async (doctorData: FormData): Promise<doctors> => {
    const responce = await fetch(
      `${BACKEND_API_URL}/api/doctor/register/${hospitalId}`,
      {
        method: "POST",
        credentials: "include",

        body: doctorData,
      }
    )

    if (!responce) {
      throw new Error("failed to register doctor")
    }

    const data = await responce.json()
    if (data.success === false) {
      throw toast.error(data.message)
    }

    toast.success(data.message)
    return data
  }

  const { mutate: doctorRegister, isLoading } = useMutation(registerDoctor, {
    onSuccess: () => {
      console.log("Doctor register successful")
    },
    onError: () => {
      console.error("failed to register doctor")
    },
  })
  return { doctorRegister, isLoading }
}

export const useMyDoctorLogin = () => {
  const { saveUserToSession } = useUser()
  const navigate = useNavigate()

  const loginDoctor = async (signInData: FormData) => {
    console.log("doctor sing==><<")
    const formDataObj = Object.fromEntries(signInData.entries())

    console.log("Docto signInDataObj", formDataObj)

    const response = await fetch(`${BACKEND_API_URL}/api/doctor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formDataObj),
    })

    if (!response.ok) {
      throw new Error("Failed to sign in user")
    }

    const data = await response.json()
    saveUserToSession(data)
    return data
  }

  const { mutate: DoctorSign, isLoading } = useMutation(loginDoctor, {
    onSuccess: () => {
      toast.success("Doctor Sign-in successful")
      navigate("/")
    },
    onError: () => {
      toast.error("Error while Doctor Signin")
    },
  })

  return { DoctorSign, isLoading }
}

export const useMyDoctorDetail = (doctorId: string) => {
  const getDoctorDetail = async (id: string): Promise<string> => {
    const response = await fetch(`${BACKEND_API_URL}/api/doctor/detail/${id}`, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch doctor details")
    }

    const data = await response.json()
    return data
  }

  const { data: doctorDetail, isLoading } = useQuery(
    ["doctorDetail", doctorId],
    () => getDoctorDetail(doctorId),
    {
      enabled: !!doctorId,
      onSuccess: () => {
        console.log("Successfully fetched doctor details")
      },
      onError: (error) => {
        console.error("Error fetching doctor details:", error)
      },
    }
  )

  return { doctorDetail, isLoading }
}
