import { Outlet, Navigate } from "react-router-dom"

const ProtectRouter = () => {
  const currentUser = localStorage.getItem("user")
  
  return currentUser ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectRouter
