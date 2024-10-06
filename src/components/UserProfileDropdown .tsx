// import { Link } from "react-router-dom"

// import { useUser } from "@/context/userContext"
// import {
//   DropdownMenu,
//   DropdownMenuItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu"
// import { toast } from "sonner"
// import { BACKEND_API_URL } from "@/main"
// import { Separator } from "./ui/separator"

// const UserProfileDropdown = () => {
//   const { currentUser, setCurrentUser } = useUser()

//   const handleSignOut = async () => {
//     try {
//       const responce = await fetch(`${BACKEND_API_URL}/api/auth/logout`, {
//         method: "GET",
//         credentials: "include",
//       })
//       if (!responce.ok) {
//         console.log("Error while logut user")
//         return toast.error("faild to logout")
//       }

//       sessionStorage.removeItem("user")
//       setCurrentUser(null)
//       const data = await responce.json()
//       toast.success(data.message)
//       console.log("this is data", data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <>
//       {currentUser ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <img
//               src={currentUser.profilepic}
//               alt="Profile picture"
//               className="h-12 w-12 rounded-full"
//             />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem>
//               <span className="block text-sm font-medium truncate">
//                 {currentUser.email}
//               </span>
//             </DropdownMenuItem>
//             <Separator />
//             <DropdownMenuItem>
//               <Link
//                 to={
//                   currentUser.role === "patient"
//                     ? "/patientdashboard?tab=profile"
//                     : "/hospitaldashboard?tab=profile"
//                 }
//               >
//                 {currentUser.role === "patient" ? (
//                   <span>patient Profile</span>
//                 ) : (
//                   <span>hospital Profile</span>
//                 )}
//               </Link>
//             </DropdownMenuItem>
//             <Separator />
//             <DropdownMenuItem onClick={handleSignOut}>
//               Sign out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <Link to="/signin">Sign In</Link>
//       )}
//     </>
//   )
// }

// export default UserProfileDropdown

import { Link } from "react-router-dom"
import { useUser } from "@/context/userContext"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { toast } from "sonner"
import { BACKEND_API_URL } from "@/main"
import { Separator } from "./ui/separator"

const UserProfileDropdown = () => {
  const { currentUser, setCurrentUser } = useUser()

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      })
      if (!response.ok) {
        console.log("Error while logging out user")
        return toast.error("Failed to log out")
      }

      sessionStorage.removeItem("user")
      setCurrentUser(null)
      const data = await response.json()
      toast.success(data.message)
      console.log("this is data", data)
    } catch (error) {
      console.log(error)
    }
  }

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
                to={
                  currentUser.role === "patient"
                    ? "/createhospital"
                    : "/createhospital"
                }
              >
                {currentUser.role === "patient" ? (
                  <span>Patient Profile</span>
                ) : (
                  <span>Hospital Profile</span>
                )}
              </Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
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
