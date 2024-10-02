import { useUser } from "@/context/userContext"

import { Outlet, Navigate } from "react-router-dom"

const ProtectRouter = () => {
  const { currentUser } = useUser()
  return currentUser ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectRouter
