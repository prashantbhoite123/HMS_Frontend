import { useMyDashData } from "@/Api/Hospital/useDashData"
import DashAdminApprovel from "@/components/Dashbord/DashAdminApprovel"
import DashAppoinment from "@/components/Dashbord/DashAppoinment"
import DashboardComponents from "@/components/Dashbord/DashboardComponents"
import DashDoctorPatient from "@/components/Dashbord/DashDoctorPatient"
import DashDoctors from "@/components/Dashbord/DashDoctors"
import DashPendingHos from "@/components/Dashbord/DashPendingHos"
import DashProfile from "@/components/Dashbord/DashProfile"
import DoctorPendingApp from "@/components/Dashbord/DoctorPendingApp"
import Loader from "@/components/Loader"
import { useMyCacelAppoinment } from "@/Api/Hospital/useDashData"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const HosDashboard = () => {
  const { dashdata, isLoading, refetch } = useMyDashData()
  const { cancelApp, isLoading: cancelAppLoading } =
    useMyCacelAppoinment(refetch)
  const location = useLocation()
  const [tab, setTab] = useState("")

  useEffect(() => {
    if (!cancelAppLoading && dashdata?.length) {
      refetch()
    }
  }, [cancelAppLoading, dashdata, refetch])

  const handleCancel = (reson: string, appId: string) => {
    cancelApp({ reson, appId })
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get("tab")
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-4">
      {tab === "dash" && <DashboardComponents dashData={dashdata} />}
      {tab === "dashappoinment" && (
        <DashAppoinment
          allAppoinment={dashdata?.allAppointments}
          cancelApp={handleCancel}
          isLoading={cancelAppLoading}
        />
      )}
      {tab === "dashapprovels" && (
        <DashPendingHos pendingHospital={dashdata?.PendingHospital} />
      )}
      {tab === "dashpendingapp" && (
        <DoctorPendingApp
          allAppoinment={dashdata?.allAppointments}
          cancelApp={handleCancel}
          isLoading={cancelAppLoading}
        />
      )}
      {tab === "dashdoctors" && (
        <DashDoctors doctors={dashdata?.totalDoctors} />
      )}
      {tab === "hospitals" && (
        <DashAdminApprovel ApprovedHospital={dashdata?.ApprovedHospital} />
      )}
      {tab === "dashpatient" && (
        <DashDoctorPatient patient={dashdata?.allPatients} />
      )}
      {tab === "profile" && <DashProfile ProfileData={dashdata?.ProfileData} />}
    </div>
  )
}

export default HosDashboard
