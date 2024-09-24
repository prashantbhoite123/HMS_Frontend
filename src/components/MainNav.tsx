import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const MainNav = () => {
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
        <Link to="/sign-in">Sign-in</Link>
      </div>
    </div>
  )
}

export default MainNav
