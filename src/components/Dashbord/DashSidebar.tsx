import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { HiArrowSmRight, HiChartPie, HiMenu, HiUser } from "react-icons/hi"
import { MdEventNote } from "react-icons/md"
import { FaUserMd } from "react-icons/fa"
import { Separator } from "../ui/separator"
import { GiExitDoor } from "react-icons/gi"
const DashSidebar = () => {
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
            className={`flex items-center gap-x-3 p-2 rounded-md ${
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

          {/* Appointment Tab */}

          <Link
            to="/dashboard?tab=dashappoinment"
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=dashappoinment"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dashappoinment")}
          >
            <MdEventNote size="25" />
            <div className="font-semibold">Appointment</div>
          </Link>

          {/* Doctors Tab */}
          <Link
            to="/dashboard?tab=dashdoctors"
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=dashdoctors"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dashdoctors")}
          >
            <FaUserMd size="25" />
            <div className="font-semibold">Doctors</div>
          </Link>
          <Link
            to="/dashboard?tab=profile"
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=profile"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=profile")}
          >
            <HiUser size="25" />
            <div className="font-semibold">Profile</div>
          </Link>
          {/* Logout */}
          <div
            className="flex items-center gap-x-3 p-2 rounded-md hover:cursor-pointer"
            onClick={() => console.log("Logout clicked")}
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
