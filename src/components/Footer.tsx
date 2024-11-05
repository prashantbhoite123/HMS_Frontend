import { BsHeartPulseFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="flex w-full p-6 items-center bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      <Link to="/">
        <span className="flex justify-center items-center gap-x-3 px-4 py-2 bg-gradient-to-r text-xl font-bold from-indigo-600 to-pink-600 rounded-md text-transparent bg-clip-text">
          <span>
            <BsHeartPulseFill className="text-pink-600" size="30" />
          </span>
          <span>CarePlusX</span>
        </span>
      </Link>
    </div>
  )
}

export default Footer
