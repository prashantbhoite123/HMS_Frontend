import { Link } from "react-router-dom"
import MainNav from "../MainNav"
import MobileNav from "../MobileNav"

import { useUser } from "@/context/userContext"
import UserProfileDropdown from "../UserProfileDropdown "
import { Button } from "./button"
import { Hospital } from "lucide-react"
// import { GiHeartWings } from "react-icons/gi"
import { BsHeartPulseFill } from "react-icons/bs"
// import { PiHeartbeatFill } from "react-icons/pi"

const Header = () => {
  const { currentUser } = useUser()
  console.log("this is a currentUser", currentUser)

  return (
    <header className="flex justify-between sticky top-0 z-10 overflow-hidden items-center p-4 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center text-xl sm:text-2xl font-bold text-white"
      >
        <span className="flex justify-center items-center gap-x-3 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
          <span>
            <BsHeartPulseFill className="text-pink-600" size="30" />
          </span>
          <span>CarePlusX</span>
        </span>
      </Link>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="hidden md:flex space-x-6">
        <MainNav />
      </div>

      <div className="hidden md:block">
        {currentUser?.role === "patient" ? (
          <Link to="/hospitals">
            <Button className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-red-500 to-pink-400 text-white px-6 py-2 rounded-md transition-transform duration-300 hover:scale-105 hover:underline shadow-md">
              <Hospital className="text-xl" />
              <span>Hospitals</span>
            </Button>
          </Link>
        ) : null}
      </div>

      {/* User Profile or Login Button */}
      <div className="hidden md:block">
        {currentUser ? (
          <UserProfileDropdown />
        ) : (
          <Link
            to="/signin"
            className="bg-white text-sm font-semibold text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
