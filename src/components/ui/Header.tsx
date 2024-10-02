import { Link } from "react-router-dom"
import MainNav from "../MainNav"
import MobileNav from "../MobileNav"
import { Button } from "./button"
import LoginBtn from "../LoginBtn"
import { useUser } from "@/context/userContext"

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
      {currentUser ? (
        <>
          {currentUser.role === "patient" && (
            <Link to="patient-dashboard">
              <img
                className="h-12 w-12 rounded-full"
                src={currentUser.profilepic}
                alt=""
              />
            </Link>
          )}
          {currentUser.role === "hospital" && (
            <div>
              {" "}
              <img
                className="h-12 w-12 rounded-full"
                src={currentUser.profilepic}
                alt=""
              />
            </div>
          )}
        </>
      ) : (
        <div className="hidden md:block">
          <LoginBtn />
        </div>
      )}
    </div>
  )
}

export default Header
