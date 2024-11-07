import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { HiArrowSmRight, HiChartPie, HiUser } from "react-icons/hi"
import { MdEventNote } from "react-icons/md"
import { FaUserMd } from "react-icons/fa"
import { Separator } from "../ui/separator"
import { GiExitDoor } from "react-icons/gi"
const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState("/dashboard?tab=dash")
  const location = useLocation()

  useEffect(() => {
    setActiveTab(location.pathname + location.search)
  }, [location])

  const handleTabChange = (tab: any) => {
    setActiveTab(tab)
  }

  return (
    <div className="w-full">
      <div>
        <div className="p-2 w-full font-semibold">
          <Link to="/">
            <Button className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white font-semibold text-lg bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-md shadow-md transition duration-200">
              <GiExitDoor size="20" />
              Back
            </Button>
          </Link>
        </div>
        <Separator className="bg-slate-400" />
        <div className="flex flex-col gap-4 p-4">
          {/* Dashboard Tab */}
          <div
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=dash"
                ? "bg-gray-500 text-white shadow-xl shadow-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dash")}
          >
            <HiChartPie size="25" />
            <Link to="/dashboard?tab=dash" className="font-semibold">
              Dashboard
            </Link>
          </div>

          {/* Appointment Tab */}
          <div
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=profile"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=profile")}
          >
            <HiUser size="25" />
            <Link to="/dashboard?tab=profile" className="font-semibold">
              Profile
            </Link>
          </div>
          <div
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=dashappoinment"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dashappoinment")}
          >
            <MdEventNote size="25" />
            <Link to="/dashboard?tab=dashappoinment" className="font-semibold">
              Appointment
            </Link>
          </div>

          {/* Doctors Tab */}
          <div
            className={`flex items-center gap-x-3 p-2 rounded-md ${
              activeTab === "/dashboard?tab=dashdoctors"
                ? "bg-gray-500 text-white"
                : ""
            }`}
            onClick={() => handleTabChange("/dashboard?tab=dashdoctors")}
          >
            <FaUserMd size="25" />
            <Link to="/dashboard?tab=dashdoctors" className="font-semibold">
              Doctors
            </Link>
          </div>

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
