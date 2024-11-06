import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar"
import { GiExitDoor } from "react-icons/gi"
const DashSidebar = () => {
  return (
    <SidebarProvider>
      <Sidebar className="w-64 bg-gray-800 ">
        <SidebarHeader className="p-6">
          <span className="inline-flex items-center px-2 p-2 bg-green-400 text-black rounded-lg hover:bg-green-500 transition-all duration-300">
            <Link to="/" className="flex items-center gap-x-2">
              <GiExitDoor className="text-lg" /> {/* Adjusted icon size */}
              <span className="font-semibold text-sm">Back</span>{" "}
              {/* Reduced text size */}
            </Link>
          </span>
        </SidebarHeader>
        <SidebarContent className="p-6">
          <span>Dashboard</span>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

export default DashSidebar
