import { useUser } from "@/context/userContext"
import { Link } from "react-router-dom"

// import { Button } from "./ui/button"
// import { useAuth0 } from "@auth0/auth0-react"

const MainNav = () => {
  const { currentUser } = useUser()
  return (
    <>
      <div className="">
        <div className="flex gap-10 text-sm md:text-lg font-semibold text-white">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          {currentUser?.role === "patient" ? (
            <Link to="/myappoinment" className="hover:underline">
              My Appoinment
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default MainNav
