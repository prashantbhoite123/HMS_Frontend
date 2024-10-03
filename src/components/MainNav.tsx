import { Link } from "react-router-dom"

// import { Button } from "./ui/button"
// import { useAuth0 } from "@auth0/auth0-react"

const MainNav = () => {
  return (
    <>
      <div className="">
        <div className="flex gap-10 text-sm md:text-sm font-semibold text-black">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
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
