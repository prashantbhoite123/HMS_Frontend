// import { Link } from "react-router-dom"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet"
import { Hospital, Menu, User } from "lucide-react"

import { Separator } from "./ui/separator"

import { useUser } from "@/context/userContext"
import { Link } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"
import { Button } from "./ui/button"
import { MdEventNote } from "react-icons/md"
import { FaBookOpen, FaHome } from "react-icons/fa"

const MobileNav = () => {
  const { currentUser } = useUser()
  return (
    <div>
      <div className="flex justify-between">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-black" />
          </SheetTrigger>
          <SheetContent className="space-y-3">
            <SheetTitle className="text-green-600 font-semibold ">
              Hospital Management
            </SheetTitle>
            <Separator />
            <div className="flex flex-col py-1 px-4 gap-y-6">
              <Link to="/" className="flex gap-x-3">
                <span>
                  <FaHome />
                </span>
                <span className="text-sm font-semibold ">Home</span>
              </Link>
              <Link to="/about" className="flex items-center gap-x-3">
                <span>
                  <FaBookOpen />
                </span>
                <span className="text-sm font-semibold">About</span>
              </Link>
              <Link
                to={
                  currentUser?.role === "patient"
                    ? "/patientprofile"
                    : "/createhospital"
                }
                className="flex gap-x-3 items-center"
              >
                <span>
                  <User />
                </span>
                <span className="text-sm font-semibold">Profile</span>
              </Link>
              {/* <Separator /> */}
              {currentUser?.role === "patient" ? (
                <>
                  <Link to="/hospitals" className="flex gap-x-3">
                    <span>
                      <Hospital />
                    </span>
                    <span className="text-sm font-semibold">Hospitals</span>
                  </Link>
                  {/* <Separator /> */}
                  <Link to="/myappoinment" className="flex gap-x-3">
                    <span>
                      <MdEventNote />
                    </span>
                    <span className="text-sm font-semibold">My Appoinment</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard?tab=dash"
                    className="flex items-center gap-x-3"
                  >
                    <span>
                      <Hospital />
                    </span>
                    <span className="text-sm font-semibold">Dashboard</span>
                  </Link>
                </>
              )}
            </div>
            <SheetFooter className="flex justify-end">
              {currentUser ? (
                <LogoutBtn />
              ) : (
                <Link to="/signin">
                  <Button className="bg-gradient-to-r  from-indigo-600 to-pink-600 mt-4 w-full">
                    Login
                  </Button>
                </Link>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileNav
