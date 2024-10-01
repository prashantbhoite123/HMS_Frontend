import { Link } from "react-router-dom"

// import { Button } from "./ui/button"
// import { useAuth0 } from "@auth0/auth0-react"

const MainNav = () => {
  return (
    <>
      <div className="">
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
      </div>
    </>
  )
}

export default MainNav
