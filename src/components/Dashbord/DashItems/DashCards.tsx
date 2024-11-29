import { Card, CardContent } from "@/components/ui/card"
import { FaUserMd } from "react-icons/fa"

import { ArrowUp, Hospital } from "lucide-react"
import { DashCard, dashDataType } from "@/Types/DashTypes"
import { useUser } from "@/context/userContext"
import { MdEventNote } from "react-icons/md"
import { HiUser } from "react-icons/hi"

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
                <HiUser size="25" />
              ) : currentUser?.role === "hospital" ? (
                <HiUser size="25" />
              ) : (
                " "
              )}
              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Total User</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Total Patient</span>
                ) : (
                  <span>Shedule Appoinment</span>
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
            <div className="flex items-center gap-x-2 text-slate-500">
              {currentUser?.role === "Admin" ? (
                <Hospital size={24} />
              ) : currentUser?.role === "hospital" ? (
                <MdEventNote size={24} />
              ) : (
                " "
              )}

              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Pending Hospitals</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Total Appointment</span>
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
                ? data?.totalAppoinments < 10
                  ? `0${data?.totalAppoinments}`
                  : data?.totalAppoinments
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.pendingHospital
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthAppointments
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
            <div className="flex items-center gap-x-2 text-slate-500">
              {currentUser?.role === "Admin" ? (
                <Hospital size={24} />
              ) : currentUser?.role === "hospital" ? (
                <FaUserMd size={24} />
              ) : (
                " "
              )}

              <span className="text-[1.1rem] font-semibold ">
                {currentUser?.role === "Admin" ? (
                  <span>Approved Hospital</span>
                ) : currentUser?.role === "hospital" ? (
                  <span>Total Doctors</span>
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
                ? data?.totalDoctors < 10
                  ? `0${data?.totalDoctors}`
                  : data?.totalDoctors
                : ""}
            </div>
            <div className="flex items-center gap-x-2 ml-7 font-semibold text-sm">
              <span className="flex gap-x-1 items-center text-green-500 ">
                <ArrowUp size={20} />
                <span>
                  {currentUser?.role === "Admin"
                    ? data?.lastMonthData?.approvedHospital
                    : currentUser?.role === "hospital"
                    ? data?.lastMonthPatients
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
