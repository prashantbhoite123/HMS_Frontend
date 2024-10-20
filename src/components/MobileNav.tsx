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
            <SheetTitle className="text-black font-semibold text-lg">
              Hospital Management
            </SheetTitle>

            <Separator />

            <Link
              to={currentUser?.role === "patient" ? "/" : "/createhospital"}
            >
              <span className="text-sm font-semibold">Profile</span>
            </Link>
            <Separator />
            <Link to="/hospitals">
              <span className="text-sm font-semibold">Hospitals</span>
            </Link>

            <SheetFooter className="mt-5">
              {currentUser ? (
                <LogoutBtn />
              ) : (
                <Link to="/signin">
                  <Button className="bg-transparent-to-r from-indigo-600 to-pink-600">
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
