import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "@/firebase"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const GoogleAuthBtn = () => {
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()

    provider.setCustomParameters({ prompt: "select_account" })
    const auth = getAuth(app)

    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const res = await fetch(`${API_BASE_URL}/api/hospital/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
      })
    } catch (error) {
      console.log(error)
      toast.error("failed to login")
    }
  }
}

export default GoogleAuthBtn
