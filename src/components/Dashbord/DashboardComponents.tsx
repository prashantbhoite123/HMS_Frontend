import DashCards from "./DashItems/DashCards"
import DashChart from "./DashItems/DashChart"
import DashRecentApp from "./DashItems/DashRecentApp"
import DashRightbar from "./DashItems/DashRightbar"

export interface CardData {
  totalDoctors: number
  totalUser: number
  totalAppoinment: number
  lastMonthUser: number
  lastMonthAppoinment: number
}

interface TotalData {
  CardData: CardData
  latesAppoinments: Array<any>
}

type Props = {
  dashData: TotalData
  loading: boolean
}
const DashboardComponents = ({ dashData, loading }: Props) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col gap-y-6">
        <div className="">
          <DashCards CardData={dashData?.CardData} loading={loading} />
        </div>
        <DashRecentApp
          latestAppoinment={dashData.latesAppoinments}
          loading={loading}
        />
        <DashChart />
      </div>
      <div className="ml-2 px-2 w-full relative">
        <DashRightbar />
      </div>
    </div>
  )
}

export default DashboardComponents
