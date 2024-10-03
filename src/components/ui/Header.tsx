import { Link } from "react-router-dom"
import MainNav from "../MainNav"
import MobileNav from "../MobileNav"

import LoginBtn from "../LoginBtn"
import { useUser } from "@/context/userContext"
import UserProfileDropdown from "../UserProfileDropdown "

const Header = () => {
  const { currentUser } = useUser()
  console.log("this is a currentUser", currentUser)
  return (
    <div className="flex justify-between items-center p-2 w-full bg-green-400">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          HMS
        </span>
      </Link>
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className=" hidden md:block ">
        <MainNav />
      </div>
      <div className="hidden md:block">
        {currentUser ? <UserProfileDropdown /> : <LoginBtn />}
      </div>
    </div>
  )
}

export default Header
