import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginDialog from "./LoginDialog"
import { useState } from "react"
const LoginBtn = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <div className="text-sm  font-semibold text-blue-500 hover:underline">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>Sign-up</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-semibold text-green-500">
              Select your categoary
            </DialogTitle>
          </DialogHeader>
          <LoginDialog handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginBtn
