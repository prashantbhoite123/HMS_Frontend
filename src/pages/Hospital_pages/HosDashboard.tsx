// import DashProfile from "@/components/Dashbord/DashProfile"
// import DashSidebar from "@/components/Dashbord/DashSidebar"
// import { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom"

// const HosDashboard = () => {
//   const location = useLocation()
//   const [tab, setTab] = useState("")
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search)
//     const tabFormUrl = urlParams.get("tab")
//     if (tabFormUrl) {
//       setTab(tabFormUrl)
//     }
//   }, [location.search])
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       <div className="md:w-56">
//         {/* sideBar */}
//         <DashSidebar />
//       </div>

//       {/* profile */}
//       {tab === "profile" && <DashProfile />}
//     </div>
//   )
// }

// export default HosDashboard

import DashProfile from "@/components/Dashbord/DashProfile"
import DashSidebar from "@/components/Dashbord/DashSidebar"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const HosDashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  return (
    <div className="">
      {/* Sidebar */}
      {/* <div className="w-56 bg-gray-800 text-white fixed h-full"> */}
      <DashSidebar />
      {/* </div> */}

      {/* Main content area, with margin to account for sidebar */}
      <div className=" ml-56 p-4 bg-red-600">
        {/* Conditionally render profile or other components based on the 'tab' state */}
        {tab === "profile" && <DashProfile />}
        {/* Add other components here based on tab state if needed */}
      </div>
    </div>
  )
}

export default HosDashboard
