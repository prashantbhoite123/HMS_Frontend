// import { Link } from "react-router-dom"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet"
import { Menu } from "lucide-react"

import { Separator } from "./ui/separator"

import { useUser } from "@/context/userContext"
import { Link } from "react-router-dom"
import LogoutBtn from "./LogoutBtn"
import { Button } from "./ui/button"

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
            <SheetTitle className="text-black font-semibold">
              Hospital Management
            </SheetTitle>

            <Separator />

            <Link
              to={
                currentUser?.role === "patient"
                  ? "/createhospital"
                  : "/createhospital"
              }
            >
              {currentUser?.role === "patient" ? (
                <span>Patient Profile</span>
              ) : (
                <span>Hospital Profile</span>
              )}
            </Link>
            <SheetFooter className="mt-5">
              {currentUser ? (
                <LogoutBtn />
              ) : (
                <Link to="/signin">
                  <Button>Login</Button>
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
