import { Link } from "react-router-dom"
import { Button } from "./ui/button"
// import { useAuth0 } from "@auth0/auth0-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginDialog from "./LoginDialog"
import { useState } from "react"

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div className="flex w-full justify-between items-center">
      <Link to="/">
        <Button variant="outline" className="text-[1.1rem]">
          HMS
        </Button>
      </Link>

      <div className="flex gap-20 text-[1.1rem]  font-semibold text-black">
        <Link to="*" className="hover:underline">
          About
        </Link>
        <Link to="*" className="hover:underline">
          Gallary
        </Link>
        <Link to="*" className="hover:underline">
          Services
        </Link>
      </div>
      <div className="text-[1.1rem] font-semibold text-black">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>Login</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center font-semibold">
                Select your categoary
              </DialogTitle>
            </DialogHeader>
            <LoginDialog handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default MainNav
