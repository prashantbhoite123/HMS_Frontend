import { Card, CardContent } from "@/components/ui/card"
import { FaUserMd } from "react-icons/fa"

import { ArrowUp, CalendarIcon, Hospital, HourglassIcon } from "lucide-react"
import { DashCard, dashDataType } from "@/Types/DashTypes"
import { useUser } from "@/context/userContext"
import { MdEventNote } from "react-icons/md"
import { HiUser } from "react-icons/hi"
import { IoIosWarning } from "react-icons/io"

interface CardData {
  completeAppoinments: number
  cancelAppoinments: number
  pendingAppoinments: number
  lastMonthAppoinment: number
  totalDoctors: number
}
type Props = {
  CardData: CardData | DashCard | dashDataType
}

const DashCards = ({ CardData }: Props) => {
  const { currentUser } = useUser()
  const data = CardData as any
  return (
    <div className="grid flex-wrap grid-rows-1 gap-y-3 md:grid-cols-3 gap-x-3">
      <div className="w-full md:w-[19vw]">
        <Card borderRadius="none">
          <CardContent className="flex flex-col gap-y-2 p-4 shadow-xl  rounded-none">
            <div className="flex items-center gap-x-2 text-slate-500">
              {currentUser?.role === "Admin" ? (
                <HiUser size="25" className="text-blue-500" />
              ) : currentUser?.role === "hospital" ? (
                <HiUser size="25" className="text-cyan-400" />
              ) : (
                <CalendarIcon className="text-yellow-400 " />
              )}
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span className="text-blue-500">Total User</span>
                ) : currentUser?.role === "hospital" ? (
                  <span className="text-cyan-400">Total Patient</span>
                ) : (
                  <span className="text-yellow-500">Shedule Appoinment</span>
                )}
              </span>
            </div>
            <div className="ml-7 text-[1.2rem] font-semibold">
              {currentUser?.role === "Admin"
                ? data?.totalUsers < 10
                  ? `0${data?.totalUsers}`
                  : data?.totalUsers
                : currentUser?.role === "hospital"
                ? data?.totalPatient < 10
                  ? `0${data?.totalPatient}`
                  : data?.totalPatient
                : data?.completedAppointments}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.users
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthPatients
                    : data?.lastMonth?.completed}
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
            <div className="flex items-center gap-x-2 text-slate-500">
              {currentUser?.role === "Admin" ? (
                <Hospital size={24} className="text-orange-500" />
              ) : currentUser?.role === "hospital" ? (
                <MdEventNote size={24} className="text-purple-800" />
              ) : (
                <HourglassIcon size={24} className="text-blue-500" />
              )}

              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span className="text-orange-500">Pending Hospitals</span>
                ) : currentUser?.role === "hospital" ? (
                  <span className="text-purple-800">Total Appointment</span>
                ) : (
                  <span className="text-blue-500">Pending Appointment</span>
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? data?.totalPendingHospital < 10
                  ? `0${data?.totalPendingHospital}`
                  : data?.totalPendingHospital
                : currentUser?.role === "hospital"
                ? data?.totalAppoinments < 10
                  ? `0${data?.totalAppoinments}`
                  : data?.totalAppoinments
                : data?.pendingAppointments}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.pendingHospital
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthAppointments
                    : data?.lastMonth?.pending}
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
            <div className="flex items-center gap-x-2 text-slate-500">
              {currentUser?.role === "Admin" ? (
                <Hospital size={24} className="text-cyan-500" />
              ) : currentUser?.role === "hospital" ? (
                <FaUserMd size={24} className="text-green-500" />
              ) : (
                <IoIosWarning size={24} className="text-red-500" />
              )}

              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span className="text-cyan-500">Approved Hospital</span>
                ) : currentUser?.role === "hospital" ? (
                  <span className="text-green-400">Total Doctors</span>
                ) : (
                  <span className="text-red-500">Cancel Appoinment</span>
                )}
              </span>
            </div>
            <div className="ml-7 text-lg font-semibold">
              {currentUser?.role === "Admin"
                ? data?.totalApprovedHospital < 10
                  ? `0${data?.totalApprovedHospital}`
                  : data?.totalApprovedHospital
                : currentUser?.role === "hospital"
                ? data?.totalDoctors < 10
                  ? `0${data?.totalDoctors}`
                  : data?.totalDoctors
                : data?.cancelledAppointments}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.approvedHospital
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthPatients
                    : data?.lastMonth?.cancelled}
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
