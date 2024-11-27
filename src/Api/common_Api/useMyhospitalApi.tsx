import { RegisterHos } from "@/Types/types"
import { useMutation } from "react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/context/userContext"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

console.log(API_BASE_URL)

export const useHospitalRegistration = () => {
  const naviagate = useNavigate()
  const registerHospital = async (
    registrationData: FormData
  ): Promise<RegisterHos> => {
    const fromDataObj = Object.fromEntries(registrationData.entries())

    console.log("fromDataObj", fromDataObj)

    const responce = await fetch(`${API_BASE_URL}/api/hospital/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromDataObj),
    })

    if (!responce.ok) {
      throw new Error("Faild to register hospital")
    }

    const data = await responce.json()
    console.log("====>", data)

    toast.success(data.message)
    return data
  }

  const { mutate: registerhospital, isLoading } = useMutation(
    registerHospital,
    {
      onSuccess: () => {
        toast.success(" Registration Successfully")
        naviagate("/signin")
      },
      onError: () => {
        console.error("Error while registration")
      },
    }
  )

  return { registerhospital, isLoading }
}

export const useUserSignIn = () => {
  const { saveUserToSession } = useUser()
  const navigate = useNavigate()

  // Function to handle user sign-in
  const signInUser = async (signInData: FormData) => {
    const formDataObj = Object.fromEntries(signInData.entries())

    console.log("signInDataObj", formDataObj)

    const response = await fetch(`${API_BASE_URL}/api/hospital/signin`, {
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
    if (data.patientproStatus) {
      navigate("/patientprofile")
    } else {
      navigate("/")
    }

    saveUserToSession(data.rest)
    return data
  }

  const { mutate: signIn, isLoading } = useMutation(signInUser, {
    onSuccess: () => {
      toast.success("Sign-in successful")
    },
    onError: () => {
      toast.error("Error while signing in")
    },
  })

  return { signIn, isLoading }
}
