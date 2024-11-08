import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"

const DashboardComponents = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-y-6">
        <div className="">
          <DashCards />
        </div>
        <DashRecentApp />
        <DashChart />
      </div>
      <div className="ml-2 px-2 w-full relative">
        <DashRightbar />
      </div>
    </div>
  )
}

export default DashboardComponents
