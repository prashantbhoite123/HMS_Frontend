// import { Link } from "react-router-dom"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import { Menu } from "lucide-react"

import { Separator } from "./ui/separator"

import LoginBtn from "./LoginBtn"

const MobileNav = () => {
  return (
    <div>
      <div className="flex justify-between">
        {/* <Link to="/">
          <Button className="text-[1.1rem]">Kas tari hotay</Button>
        </Link> */}
        <Sheet>
          <SheetTrigger>
            <Menu className="text-black" />
          </SheetTrigger>
          <SheetContent className="space-y-3">
            <SheetTitle className="text-black font-semibold">
              Hospital Management
            </SheetTitle>
            <Separator />
            <SheetDescription>
              <LoginBtn />
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileNav
