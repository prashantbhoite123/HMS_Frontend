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

const MainNav = () => {
  // const { isAuthenticated } = useAuth0()
  return (
    <div className="flex w-full justify-between items-center">
      <Link to="/">
        <Button className="text-[1.1rem]">Kas tari hotay</Button>
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
        <Button variant="ghost" className="font-bold hover:text-green-400">
          <Dialog>
            <DialogTrigger>Login</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select your categoary</DialogTitle>
              </DialogHeader>
              <LoginDialog />
            </DialogContent>
          </Dialog>
        </Button>
      </div>
    </div>
  )
}

export default MainNav
