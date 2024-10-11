import { Link } from "react-router-dom"
import { useUser } from "@/context/userContext"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"
import LogoutBtn from "./LogoutBtn"

const UserProfileDropdown = () => {
  const { currentUser } = useUser()

  return (
    <>
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              src={currentUser.profilepic}
              alt="Profile picture"
              className="size-10 rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1 mr-10">
            <DropdownMenuItem>
              <div className="">
                <span className="block text-sm font-medium truncate">
                  {currentUser.username}
                </span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </div>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Link
                to={currentUser.role === "patient" ? "/" : "/createhospital"}
              >
                {currentUser.role === "patient" ? (
                  <span>Patient Profile</span>
                ) : (
                  <span>Hospital Profile</span>
                )}
              </Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <LogoutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </>
  )
}

export default UserProfileDropdown
