import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"

const DashboardComponents = () => {
  return (
    <div className="flex flex-col md:flex-row p-2">
      <div className="flex flex-col gap-2">
        <div className="">
          <DashCards />
        </div>
        <DashRecentApp />
        <DashChart />
      </div>
      <div className="ml-2 px-2 sticky top-2">
        <DashRightbar />
      </div>
    </div>
  )
}

export default DashboardComponents
