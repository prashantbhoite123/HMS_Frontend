import DashSidebar from "@/components/Dashbord/DashSidebar"
import DashProfile from "@/components/Dashbord/DashProfile"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"

const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get("tab")
    if (tabFormUrl) {
      setTab(tabFormUrl)
    }
  }, [location.search])
  return (
    <div>
      <SidebarProvider>
        <div className="">
          {/* sideBar */}
          <DashSidebar />
        </div>
      </SidebarProvider>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
    </div>
  )
}

export default Dashboard
