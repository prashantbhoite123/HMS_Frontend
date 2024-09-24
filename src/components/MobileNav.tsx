import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const MobileNav = () => {
  return (
    <div>
      <Link to="/">
        <Button className="text-[1.1rem]">Kas tari hotay</Button>
      </Link>
    </div>
  )
}

export default MobileNav
