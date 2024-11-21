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
                  {currentUser.role === "Admin" ? (
                    <span className=" text-slate-800 rounded-full  py-4">
                      <span> Admin</span>
                    </span>
                  ) : currentUser.role === "Doctor" ? (
                    <span className=" text-slate-800 rounded-full  py-4">
                      <span>Doctor</span>
                    </span>
                  ) : (
                    currentUser.username
                  )}
                </span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </div>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem className="flex gap-y-2 flex-col justify-start items-start">
              <Link
                to={
                  currentUser.role === "patient"
                    ? "/"
                    : currentUser.role === "hospital"
                    ? "/createhospital"
                    : currentUser.role === "Doctor"
                    ? "/doctorProfile"
                    : "/requestedhos"
                }
              >
                {currentUser.role === "patient" ? (
                  <span>Patient Profile</span>
                ) : currentUser.role === "hospital" ? (
                  <span>Hospital Profile</span>
                ) : currentUser.role === "Doctor" ? (
                  <span>Doctor Profile</span>
                ) : (
                  <span>Approvels</span>
                )}
              </Link>
            </DropdownMenuItem>
            {currentUser.role === "Admin" ? <Separator /> : ""}
            {currentUser.role === "Admin" ? (
              <DropdownMenuItem className="flex gap-y-2 flex-col justify-start items-start">
                <Link to="/adminProfile">Profile</Link>
              </DropdownMenuItem>
            ) : (
              ""
            )}

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
