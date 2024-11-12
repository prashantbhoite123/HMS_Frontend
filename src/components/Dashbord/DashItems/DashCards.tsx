import { Card, CardContent } from "@/components/ui/card"
import { FaUserMd } from "react-icons/fa"
import { MdEventNote, MdSupervisedUserCircle } from "react-icons/md"

import { ArrowUp } from "lucide-react"

interface CardData {
  totalDoctors: number
  totalUser: number
  pendingAppoinments: number
  lastMonthAppoinment: number
}
type Props = {
  CardData: CardData
}

const DashCards = ({ CardData }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <MdSupervisedUserCircle size={24} />
              <span className="text-[1.2rem] font-semibold ">Total Users</span>
            </div>
            <div className="ml-7 text-[1.2rem] font-semibold">
              {CardData?.totalUser < 10
                ? `0${CardData?.totalUser}`
                : CardData?.totalUser}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>{CardData.lastMonthAppoinment}</span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <MdEventNote size={24} />
              <span className="text-[1.2rem] font-semibold ">
                Pending Appoinment
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {CardData?.pendingAppoinments < 10
                ? `0${CardData?.pendingAppoinments}`
                : CardData?.pendingAppoinments}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>{CardData.lastMonthAppoinment}</span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-green-500">
              <FaUserMd size={24} />

              <span className="text-[1.2rem] font-semibold ">
                Total Doctors
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {CardData?.totalDoctors < 10
                ? `0${CardData?.totalDoctors}`
                : CardData?.totalDoctors}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>{CardData.lastMonthAppoinment}</span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashCards
