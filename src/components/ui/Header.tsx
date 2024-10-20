

import { Link } from "react-router-dom"
import MainNav from "../MainNav"
import MobileNav from "../MobileNav"

import { useUser } from "@/context/userContext"
import UserProfileDropdown from "../UserProfileDropdown "

const Header = () => {
  const { currentUser } = useUser()
  console.log("this is a currentUser", currentUser)

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center text-xl sm:text-2xl font-bold text-white"
      >
        <span className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-md">
          CarePlusX
        </span>
      </Link>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Main Navigation for desktop */}
      <div className="hidden md:flex space-x-6">
        <MainNav />
      </div>

      {/* Hospital Link (if user is logged in) */}
      <div className="hidden md:block">
        {currentUser ? (
          <Link to="/hospitals">
            <h2 className="text-lg font-semibold text-white hover:underline transition duration-300">
              Hospitals
            </h2>
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
