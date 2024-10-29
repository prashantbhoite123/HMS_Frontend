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
            <SheetTitle className="text-green-600 font-semibold text-[1.3rem]">
              Hospital Management
            </SheetTitle>

            <Separator />

            <Link
              to={currentUser?.role === "patient" ? "/" : "/createhospital"}
              className="flex gap-x-3 items-center"
            >
              <span>
                <User size="19" color="blue" />
              </span>
              <span className="text-sm font-semibold">Profile</span>
            </Link>
            <Separator />
            {currentUser?.role === "patient" ? (
              <>
                <Link to="/hospitals" className="flex gap-x-3">
                  <span>
                    <Hospital size="19" color="red" />
                  </span>
                  <span className="text-sm font-semibold">Hospitals</span>
                </Link>
                <Separator />
                <Link to="/myappoinment" className="flex gap-x-3">
                  <span>
                    <MdEventNote size="19" color="orange" />
                  </span>
                  <span className="text-sm font-semibold">My Appoinment</span>
                </Link>
              </>
            ) : (
              ""
            )}
            <SheetFooter className="flex justify-end">
              {currentUser ? (
                <LogoutBtn />
              ) : (
                <Link to="/signin">
                  <Button className="bg-transparent-to-r from-indigo-600 to-pink-600 mt-4 ">
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
