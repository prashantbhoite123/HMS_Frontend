import { useUser } from "@/context/userContext"
import { Navigate, Outlet } from "react-router-dom"

const AdminProtect = () => {
  const { currentUser } = useUser()
  return currentUser ? <Navigate to="/" /> : <Outlet />
}

export default AdminProtect
