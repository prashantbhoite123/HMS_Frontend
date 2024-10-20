import { toast } from "sonner"
import { Button } from "./ui/button"
import { BACKEND_API_URL } from "@/main"
import { useUser } from "@/context/userContext"
import { useNavigate } from "react-router-dom"

const LogoutBtn = () => {
  const naviagte = useNavigate()
  const { setCurrentUser } = useUser()
  const handleSignOut = async () => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      })
      if (!response.ok) {
        console.log("Error while logging out user")
        return toast.error("Failed to log out")
      }

      localStorage.removeItem("user")
      setCurrentUser(null)
      const data = await response.json()
      toast.success(data.message)
      naviagte("/")
      console.log("this is data", data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button
      onClick={handleSignOut}
      className="text-lg bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md"
    >
      Log out
    </Button>
  )
}

export default LogoutBtn
