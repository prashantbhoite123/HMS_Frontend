import { DashboardResponse, ResponseType } from "@/Types/DashTypes"
import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"
import { useUser } from "@/context/userContext"

// Define types for the doctors

type Props = {
  dashData: DashboardResponse | ResponseType
}
const DashboardComponents = ({ dashData }: Props) => {
  const { currentUser } = useUser()
  if (!dashData) {
    return (
      <span className="text-xl font-semibold text-red-500">
        No Available query
      </span>
    )
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-y-6">
        <div className="">
          <DashCards
            CardData={
              currentUser?.role === "Admin"
                ? dashData?.dashCard
                : currentUser?.role === "hospital"
                ? dashData?.CardData
                : ""
            }
          />
        </div>
        <DashRecentApp
          latestAppoinment={
            currentUser?.role === "Admin"
              ? dashData?.latestPendingHospitals
              : currentUser?.role === "hospital"
              ? dashData?.latestAppoinment
              : ""
          }
        />
        <DashChart chartData={dashData?.chartData} />
      </div>
      <div className="relative">
        <DashRightbar
          todayApp={
            currentUser?.role === "Admin"
              ? dashData?.todayAppointments
              : currentUser?.role === "hospital"
              ? dashData?.todayAppointments
              : ""
          }
        />
      </div>
    </div>
  )
}

export default DashboardComponents
