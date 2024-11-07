import DashAppoinment from "@/components/Dashbord/DashAppoinment"
import DashDoctors from "@/components/Dashbord/DashDoctors"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
const HosDashboard = () => {
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
      {tab === "dashappoinment" && <DashAppoinment />}
      {tab === "dashdoctors" && <DashDoctors />}
    </div>
  )
}

export default HosDashboard
