import { useUser } from "@/context/userContext"
import { Outlet } from "react-router-dom"

const PatientProtect = () => {
  const { currentUser } = useUser()
  return currentUser?.role === "patient" ? <Outlet /> : ""
}

export default PatientProtect
