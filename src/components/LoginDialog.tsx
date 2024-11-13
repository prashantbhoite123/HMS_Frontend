import { Link } from "react-router-dom"
import { Button } from "./ui/button"

type Props = {
  handleClose: () => void
}

const LoginDialog = ({ handleClose }: Props) => {
  return (
    <div className="flex justify-evenly">
      <Link to="/signuphospital">
        <Button
          onClick={() => handleClose()}
          className="h-[15vh] md:h-[20vh] w-[15vh]  md:w-[20vh] bg-green-400  text-black font-semibold shadow-md shadow-gray-800 hover:text-white text-lg"
        >
          As a patient
        </Button>
      </Link>
      <Link to="/signuphospital?role=hospital">
        <Button
          onClick={() => handleClose()}
          className="relative h-[15vh] md:h-[20vh] w-[15vh] md:w-[20vh] bg-green-400 text-black font-semibold shadow-md shadow-gray-800 text-lg transition-transform duration-500 hover:rotate-y-180"
        >
          As a Hospital
        </Button>
      </Link>
      
    </div>
  )
}

export default LoginDialog
