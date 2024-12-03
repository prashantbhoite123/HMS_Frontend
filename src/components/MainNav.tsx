
import { FaBookOpen,FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"



const MainNav = () => {
  return (
    <>
      <div className="">
        <div className="flex gap-10 text-sm md:text-lg font-semibold text-white">
          <Link
            to="/"
            className="hover:underline flex justify-center items-center gap-x-2"
          >
            <span>
              <FaHome />
            </span>
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="hover:underline flex justify-center items-center gap-x-2"
          >
            <span>
              <FaBookOpen />
            </span>
            <span>About</span>
          </Link>
          
        </div>
      </div>
    </>
  )
}

export default MainNav
