import { Link } from "react-router-dom"
import MainNav from "../MainNav"
import MobileNav from "../MobileNav"
import { Button } from "./button"
import LoginBtn from "../LoginBtn"
import { useUser } from "@/context/userContext"
import UserProfileDropdown from "../UserProfileDropdown "

const Header = () => {
  const { currentUser } = useUser()
  console.log("this is a currentUser", currentUser)
  return (
    <div className="flex justify-between p-6 w-full bg-green-400">
      <Link to="/">
        <Button variant="ghost" className="text-[1.1rem] hover:bg-green-400">
          HMS
        </Button>
      </Link>
      <div className="md:hidden">
        <MobileNav />
      </div>

      <div className="hidden md:block">
        <MainNav />
      </div>
      <div className="hidden md:block">
        {currentUser ? <UserProfileDropdown /> : <LoginBtn />}
      </div>
    </div>
  )
}

export default Header
