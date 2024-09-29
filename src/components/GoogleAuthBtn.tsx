import { ClipLoader } from "react-spinners"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/firebase" // Use the auth instance
import { toast } from "sonner"
import { Button } from "./ui/button"
import { AiFillGoogleCircle } from "react-icons/ai"
import { useState } from "react"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type Props = {
  role: string | null
}

const GoogleAuthBtn = ({ role }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleGoogleClick = async () => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: "select_account" })

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      console.log("Google user data:", user)

      const res = await fetch(`${API_BASE_URL}/api/hospital/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          hosname: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          role: role,
        }),
      })

      if (!res.ok) {
        return console.log("Failed to login")
        setLoading(true)
      }
      const data = await res.json()
      if (data.success === true) {
        toast.success("Registration successs")
      } else {
        toast.error(data.error)
      }

      console.log("this is data", data)
      setLoading(false)
    } catch (error) {
      console.error("Error during Google sign-in:", error)
      toast.error("Failed to login")
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={loading}
      onClick={handleGoogleClick}
      className="w-full bg-gradient-to-r from-pink-400 to-blue-500 mt-5 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      <span className="font-semibold text-md gap-3">
        {loading ? (
          <span className="flex justify-center items-center gap-3">
            <ClipLoader loading={loading} size={25} color="#36d7b7" />
            <span>Loading ...</span>
          </span>
        ) : (
          "Continue With Google"
        )}
      </span>
    </Button>
  )
}

export default GoogleAuthBtn
