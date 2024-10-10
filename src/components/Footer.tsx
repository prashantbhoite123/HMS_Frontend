import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="flex w-full p-6 items-center bg-green-400">
      <Link to="/">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          CarePlusX
        </span>
      </Link>
    </div>
  )
}

export default Footer
