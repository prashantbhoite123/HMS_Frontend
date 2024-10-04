import { Outlet, Navigate } from "react-router-dom"

const ProtectRouter = () => {
  const currentUser = sessionStorage.getItem("user")
  console.log("protect ====", currentUser)
  return currentUser ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectRouter
