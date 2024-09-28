import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "@/firebase"
import { toast } from "sonner"

const GoogleAuthBtn = () => {
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()

    provider.setCustomParameters({ prompt: "select_account" })
    const auth = getAuth(app)

      try {
        
          
    } catch (error) {
      console.log(error)
      toast.error("failed to login")
    }
  }
}

export default GoogleAuthBtn
