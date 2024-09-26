import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import { Menu } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import LoginDialog from "./LoginDialog"
import { Separator } from "./ui/separator"

const MobileNav = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Link to="/">
          <Button className="text-[1.1rem]">Kas tari hotay</Button>
        </Link>
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
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button className="bg-green-400 w-full text-black font-semibold">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select your categoary</DialogTitle>
                  </DialogHeader>
                  <LoginDialog />
                </DialogContent>
              </Dialog>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default MobileNav
