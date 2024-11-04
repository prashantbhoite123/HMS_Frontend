import { useUser } from "@/context/userContext"

import { FaBookOpen, FaClipboardList, FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

// import { Button } from "./ui/button"
// import { useAuth0 } from "@auth0/auth0-react"

const MainNav = () => {
  const { currentUser } = useUser()
  return (
    <>
      <div className="">
        <div className="flex gap-10 text-sm md:text-lg font-semibold text-white">
          <Link
            to="/"
            className="hover:underline flex justify-center items-center gap-x-2"
          >
            <span>
              <FaHome />
            </span>
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="hover:underline flex justify-center items-center gap-x-2"
          >
            <span>
              <FaBookOpen />
            </span>
            <span>About</span>
          </Link>
          {currentUser?.role === "patient" ? (
            <Link
              to="/myappoinment"
              className="hover:underline flex justify-center items-center gap-x-2"
            >
              <span>
                <FaClipboardList />
              </span>
              <span>My Appoinment</span>
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
