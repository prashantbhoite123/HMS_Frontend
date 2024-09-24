import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <div className="flex w-full p-6 items-center bg-green-400">
      <Link to="/">
        <Button>Kas tari hotay</Button>
      </Link>
    </div>
  )
}

export default Footer
