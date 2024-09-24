import MainNav from "../MainNav"
import MobileNav from "../MobileNav"

const Header = () => {
  return (
    <div className="p-6 w-full bg-green-400">
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <MainNav />
      </div>
    </div>
  )
}

export default Header
