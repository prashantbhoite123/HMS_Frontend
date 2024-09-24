import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
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
        {isAuthenticated ? (
          <Link to="/hospital">
            <Button
              variant="ghost"
              className="font-bold hover:text-green-400"
              onClick={async () => await loginWithRedirect()}
            >
              Hospitals
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className="font-bold hover:text-green-400"
            onClick={async () => await loginWithRedirect()}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  )
}

export default MainNav
