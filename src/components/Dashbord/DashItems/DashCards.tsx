import { Card, CardContent } from "@/components/ui/card"
import {
  FaExclamationTriangle,
  FaHourglassHalf,
  FaRegCalendarCheck,
} from "react-icons/fa"

import { ArrowUp } from "lucide-react"

interface CardData {
  completeAppoinments: number
  cancelAppoinments: number
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
            <div className="flex items-center gap-x-2 text-orange-500">
              <span className="">
                <FaRegCalendarCheck size={24} />
              </span>
              <span className="text-[1.1rem] font-semibold ">
                Scheduled appoinment
              </span>
            </div>
            <div className="ml-7 text-[1.2rem] font-semibold">
              {CardData?.completeAppoinments < 10
                ? `0${CardData?.completeAppoinments}`
                : CardData?.completeAppoinments}
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
            <div className="flex items-center gap-x-2 text-blue-500">
              <span className="text-blue-500">
                {" "}
                <FaHourglassHalf size={24} />
              </span>
              <span className="text-[1.1rem] font-semibold ">
                Pending appoinment
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
            <div className="flex items-center gap-x-2 text-red-500">
              <FaExclamationTriangle size={24} />

              <span className="text-[1.1rem] font-semibold ">
                Cancelled appoinment
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {CardData?.cancelAppoinments < 10
                ? `0${CardData?.cancelAppoinments}`
                : CardData?.cancelAppoinments}
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
