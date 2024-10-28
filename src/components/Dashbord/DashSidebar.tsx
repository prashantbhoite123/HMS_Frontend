import { Sidebar, SidebarHeader, SidebarMenu } from "../ui/sidebar"

const DashSidebar = () => {
  return (
    <Sidebar className="w-64 bg-gray-800 text-white fixed">
      <SidebarHeader>
        <h1>Dashboard</h1>
      </SidebarHeader>
    </Sidebar>
  )
}

export default DashSidebar
