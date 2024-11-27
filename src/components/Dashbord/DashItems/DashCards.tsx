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
  const data = CardData as any
  return (
    <div className="grid flex-wrap grid-rows-1 gap-y-3 md:grid-cols-3 gap-x-3">
      <div className="w-full md:w-[19vw]">
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
                ? data?.totalUsers < 10
                  ? `0${data?.totalUsers}`
                  : data?.totalUsers
                : currentUser?.role === "hospital"
                ? data?.completeAppoinments < 10
                  ? `0${data?.completeAppoinments}`
                  : data?.completeAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.users
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthAppoinment
                    : ""}
                </span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full md:w-[19vw]">
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
                ? data?.totalPendingHospital < 10
                  ? `0${data?.totalPendingHospital}`
                  : data?.totalPendingHospital
                : currentUser?.role === "hospital"
                ? data?.pendingAppoinments < 10
                  ? `0${data?.pendingAppoinments}`
                  : data?.pendingAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.pendingHospital
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthAppoinment
                    : ""}
                </span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[19vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-red-500">
              <FaExclamationTriangle size={24} />
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span> Approved Hospital</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Cancel appointment</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? data?.totalApprovedHospital < 10
                  ? `0${data?.totalApprovedHospital}`
                  : data?.totalApprovedHospital
                : currentUser?.role === "hospital"
                ? data?.cancelAppoinments < 10
                  ? `0${data?.cancelAppoinments}`
                  : data?.cancelAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>{data?.lastMonthData?.approvedHospital}</span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <div className="w-full md:w-[20vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl rounded-none">
            <div className="flex items-center gap-x-2 text-red-500">
              <FaExclamationTriangle size={24} />
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Total Patient</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Cancel Appoinments</span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? data?.totalPatient < 10
                  ? `0${data?.totalPatient}`
                  : data?.totalPatient
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.patients
                    : ""}
                </span>
              </span>
              <span className="text-slate-400">Last Month</span>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}

export default DashCards
