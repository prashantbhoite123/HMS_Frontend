import { Card, CardContent } from "@/components/ui/card"
import {
  FaExclamationTriangle,
  FaHourglassHalf,
  FaRegCalendarCheck,
} from "react-icons/fa"

import { ArrowUp } from "lucide-react"
import { DashCard } from "@/Types/DashTypes"
import { useUser } from "@/context/userContext"

interface CardData {
  completeAppoinments: number
  cancelAppoinments: number
  pendingAppoinments: number
  lastMonthAppoinment: number
  totalDoctors: number
}
type Props = {
  CardData: CardData | DashCard
}

const DashCards = ({ CardData }: Props) => {
  const { currentUser } = useUser()
  return (
    <div className="flex flex-col md:flex-row gap-3 ">
      <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-orange-500">
              <span className="">
                <FaRegCalendarCheck size={24} />
              </span>
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Total User</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Scheduled appointment</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="ml-7 text-[1.2rem] font-semibold">
              {currentUser?.role === "Admin"
                ? CardData?.totalUsers < 10
                  ? `0${CardData?.totalUsers}`
                  : CardData?.totalUsers
                : currentUser?.role === "hospital"
                ? CardData?.completeAppoinments < 10
                  ? `0${CardData?.completeAppoinments}`
                  : CardData?.completeAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? CardData?.lastMonthData?.users
                    : currentUser?.role === "hospital"
                    ? CardData.lastMonthAppoinment
                    : ""}
                </span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {currentUser?.role === "Admin" && (
        <div className="w-full md:w-[20vw]">
          <Card borderRadius="none">
            <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
              <div className="flex items-center gap-x-2 text-red-500">
                <FaExclamationTriangle size={24} />
                <span className="text-[1.1rem] font-semibold ">
                  Approved Hospital
                </span>
              </div>
              <div className="ml-7 text-lg font-semibold">
                {CardData?.totalApprovedHospital < 10
                  ? `0${CardData?.totalApprovedHospital}`
                  : CardData?.totalApprovedHospital}
              </div>
              <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
                <span className="flex gap-x-1 items-center text-green-500 ">
                  <ArrowUp size={20} />
                  <span>{CardData?.lastMonthData?.approvedHospital}</span>
                </span>
                <span className="text-slate-400">Last Month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-blue-500">
              <span className="text-blue-500">
                <FaHourglassHalf size={24} />
              </span>
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Pending Hospitals</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Pending appointment</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? CardData?.totalPendingHospital < 10
                  ? `0${CardData?.totalPendingHospital}`
                  : CardData?.totalPendingHospital
                : currentUser?.role === "hospital"
                ? CardData?.pendingAppoinments < 10
                  ? `0${CardData?.pendingAppoinments}`
                  : CardData?.pendingAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? CardData?.lastMonthData?.pendingHospital
                    : currentUser?.role === "hospital"
                    ? CardData.lastMonthAppoinment
                    : ""}
                </span>
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
                {currentUser?.role === "Admin" ? (
                  <span>Total Patient</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Total Doctor</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? CardData?.totalPatient < 10
                  ? `0${CardData?.totalPatient}`
                  : CardData?.totalPatient
                : currentUser?.role === "hospital"
                ? CardData?.totalDoctors < 10
                  ? `0${CardData?.totalDoctors}`
                  : CardData?.totalDoctors
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? CardData?.lastMonthData?.patients
                    : ""}
                </span>
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
