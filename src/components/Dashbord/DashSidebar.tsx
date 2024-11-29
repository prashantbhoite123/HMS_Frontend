import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { HiArrowSmRight, HiChartPie, HiMenu, HiUser } from "react-icons/hi"
import { MdEventNote } from "react-icons/md"
import { FaUserMd } from "react-icons/fa"
import { Separator } from "../ui/separator"
import { GiExitDoor } from "react-icons/gi"
import { useUser } from "@/context/userContext"
import { BACKEND_API_URL } from "@/main"
import { toast } from "sonner"
import { Hospital } from "lucide-react"
const DashSidebar = () => {
  const { currentUser } = useUser()

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("/dashboard?tab=dash")
  const [openSidebar, setOpenSidebar] = useState(false)
  console.log(openSidebar)
  const location = useLocation()

  useEffect(() => {
    setActiveTab(location.pathname + location.search)
  }, [location])

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
  }

  const naviagte = useNavigate()
  const { setCurrentUser } = useUser()
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

      localStorage.removeItem("user")
      setCurrentUser(null)
      const data = await response.json()
      toast.success(data.message)
      naviagte("/")
      console.log("this is data", data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full ">
      <div className=" w-full">
        <div className="p-2 flex w-full justify-between font-semibold">
          <div className="hidden md:block w-full">
            <Button
              className="flex items-center justify-center w-full gap-2  px-4 py-2 text-white font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-md shadow-md transition duration-200"
              onClick={() => navigate(-1)}
            >
              <GiExitDoor size="20" />
              Back
            </Button>
          </div>

          <Button
            className="block md:hidden bg-gradient-to-r from-red-300 to-red-400"
            onClick={() => navigate(-1)}
          >
            <GiExitDoor size="20" />
          </Button>

          <div className="block md:hidden">
            <Button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="bg-gradient-to-r from-green-400 to-gray-300 text-white shadow-sm"
            >
              <HiMenu />
            </Button>
          </div>
        </div>

        <Separator className="bg-slate-400" />
        <div
          className={`flex flex-col space-y-4 p-4 h-auto md:h-full transition-all duration-300 ease-in-out ${
            openSidebar ? "block" : "hidden"
          } md:block`}
        >
          {/* Dashboard Tab */}
          <Link
            to="/dashboard?tab=dash"
            className={`flex items-center gap-x-3 p-2 rounded-md  hover:bg-gray-500 hover:text-white ${
              activeTab === "/dashboard?tab=dash"
                ? "bg-gray-500 text-white shadow-xl shadow-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dash")}
          >
            <HiChartPie size="25" />
            <div
              className="font-semibold
            "
            >
              Dashboard
            </div>
          </Link>
          <Link
            to="/dashboard?tab=profile"
            className={`flex justify-between items-center gap-x-3 p-2 rounded-md hover:bg-gray-500 hover:text-white ${
              activeTab === "/dashboard?tab=profile"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=profile")}
          >
            <div className="flex items-center space-x-2">
              {" "}
              <HiUser size="25" />
              <div className="font-semibold">Profile</div>
            </div>
            {currentUser?.role === "Admin" ? (
              <span className="text-sm bg-slate-800 px-1 font-semibold text-white rounded-sm">
                Admin
              </span>
            ) : currentUser?.role === "Doctor" ? (
              <span className="text-sm bg-slate-800 px-1 font-semibold text-white rounded-sm">
                Doctor
              </span>
            ) : (
              <span className="text-sm bg-slate-800 px-4  font-semibold text-white rounded-sm">
                Hos
              </span>
            )}
          </Link>

          {/* Appointment Tab */}

          <Link
            to={
              currentUser?.role === "Admin"
                ? "/dashboard?tab=dashapprovels"
                : currentUser?.role === "hospital"
                ? "/dashboard?tab=dashappoinment"
                : "/dashboard?tab=dashpendingapp"
            }
            className={`flex items-center gap-x-3 p-2 rounded-md hover:bg-gray-500 hover:text-white ${
              currentUser?.role === "Admin"
                ? activeTab == "/dashboard?tab=dashapprovels"
                  ? "bg-gray-500 text-white"
                  : ""
                : currentUser?.role === "hospital"
                ? activeTab === "/dashboard?tab=dashappoinment"
                  ? "bg-gray-500 text-white"
                  : ""
                : activeTab === "/dashboard?tab=dashpendingapp"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() =>
              handleTabChange(
                currentUser?.role === "Admin"
                  ? "/dashboard?tab=dashapprovels"
                  : currentUser?.role === "hospital"
                  ? "/dashboard?tab=dashappoinment"
                  : "/dashboard?tab=dashpendingapp"
              )
            }
          >
            {currentUser?.role === "Admin" ? (
              <Hospital />
            ) : currentUser?.role === "hospital" ? (
              <MdEventNote size="25" />
            ) : (
              <MdEventNote size="25" />
            )}

            <div className="font-semibold">
              {currentUser?.role === "Admin" ? (
                <span>Approvels</span>
              ) : currentUser?.role === "hospital" ? (
                <span>Appointment</span>
              ) : (
                <span>Appointment</span>
              )}
            </div>
          </Link>

          {/* Doctors Tab */}
          <Link
            to={
              currentUser?.role === "Admin"
                ? "/dashboard?tab=hospitals"
                : currentUser?.role === "hospital"
                ? "/dashboard?tab=dashdoctors"
                : ""
            }
            className={`flex items-center gap-x-3 p-2 rounded-md hover:bg-gray-500 hover:text-white ${
              currentUser?.role === "Admin"
                ? activeTab === "/dashboard?tab=hospitals"
                  ? "bg-gray-500 text-white"
                  : ""
                : currentUser?.role === "hospital"
                ? activeTab === "/dashboard?tab=dashdoctors"
                  ? "bg-gray-500 text-white"
                  : ""
                : ""
            }`}
            onClick={() =>
              handleTabChange(
                currentUser?.role === "Admin"
                  ? "/dashboard?tab=hospitals"
                  : "/dashboard?tab=dashdoctors"
              )
            }
          >
            {currentUser?.role === "Admin" ? (
              <Hospital />
            ) : currentUser?.role === "hospital" ? (
              <FaUserMd size="25" />
            ) : (
              ""
            )}

            <div className="font-semibold">
              {currentUser?.role === "Admin" ? (
                <span>Hospitals</span>
              ) : (
                <span>Doctors</span>
              )}
            </div>
          </Link>

          {/* Logout */}
          <div
            className="flex items-center hover:bg-gray-500  gap-x-3 p-2 rounded-md hover:cursor-pointer hover:underline hover:text-white"
            onClick={handleSignOut}
          >
            <HiArrowSmRight size="25" />
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashSidebar
