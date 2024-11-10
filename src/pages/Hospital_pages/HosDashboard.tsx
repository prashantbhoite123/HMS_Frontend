import { useMyDashData } from "@/Api/Hospital/useDashData"
import DashAppoinment from "@/components/Dashbord/DashAppoinment"
import DashboardComponents from "@/components/Dashbord/DashboardComponents"
import DashDoctors from "@/components/Dashbord/DashDoctors"
import DashProfile from "@/components/Dashbord/DashProfile"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const HosDashboard = () => {
  const { dashdata, isLoading } = useMyDashData()
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFormUrl = urlParams.get("tab")
    if (tabFormUrl) {
      setTab(tabFormUrl)
    }
  }, [location.search])

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="p-4">
      {tab === "dash" && <DashboardComponents dashData={dashdata} />}
      {tab === "dashappoinment" && (
        <DashAppoinment allAppoinment={dashdata?.allAppoinment} />
      )}
      {tab === "dashdoctors" && <DashDoctors />}
      {tab === "profile" && <DashProfile />}
    </div>
  )
}

export default HosDashboard
