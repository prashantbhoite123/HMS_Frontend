import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const LoginDialog = () => {
  return (
    <div className="flex justify-evenly">
      <Link to="/">
        <Button className="h-[20vh] w-[20vh] bg-green-400">As petient</Button>
      </Link>
      <Link to="/signuphospital">
        <Button className="h-[20vh] w-[20vh] bg-green-400">
          As a Hospital
        </Button>
      </Link>
    </div>
  )
}

export default LoginDialog
