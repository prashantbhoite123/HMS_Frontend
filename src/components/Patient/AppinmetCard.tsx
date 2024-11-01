import { TimerIcon, User } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import {
  MdCancel,
  MdCheckCircleOutline,
  MdDateRange,
  MdDelete,
  MdInfoOutline,
  MdMedicalServices,
  MdPendingActions,
} from "react-icons/md"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import LoadingBtn from "../LoadingBtn"
import { useState } from "react"
import AppoinmentUpdate from "./AppoinmentUpdate"

export type Appointment = {
  _id: string
  patientName: string
  doctorName: string
  appointmentDate: Date
  appTime: string // e.g., "13:00 - 14:00"
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}

type Props = {
  appoinment: Appointment[]
  delApp: (appId: string) => void
  loading: boolean
}

const AppinmetCard = ({ appoinment, delApp, loading }: Props) => {
  const [appoinments, setAppoinment] = useState<Appointment[]>(appoinment)
  const [dialogopen, setDialogopen] = useState(false)

  const handleDelete = async (appId: string) => {
    console.log("click delete", appId)
    delApp(appId)
    setDialogopen(false)
    setAppoinment((prev) => prev.filter((app) => app._id !== appId))
  }

  const handleCancel = () => {
    setDialogopen(false)
  }

  const formatAppointmentTime = (timeSlot: string) => {
    if (!timeSlot) return "Time not available"

    const [start, end] = timeSlot.split(" - ")

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":")
      const hourNum = parseInt(hour)
      const suffix = hourNum >= 12 ? "pm" : "am"
      const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12 // Convert 0 to 12 for 12 PM
      return `${formattedHour}:${minute} ${suffix}`
    }

    return `${formatTime(start)} - ${formatTime(end)}`
  }

  return (
    <div className="flex flex-col p-6 md:p-0 gap-6 w-full md:w-[50vw]">
      {appoinments.length > 0 ? (
        appoinments.map((appoinment: Appointment, index: number) => (
          <Card
            key={index}
            className="bg-white shadow-md shadow-slate-400 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <User size={20} className="text-blue-600" />
                    <span className="text-[1.1.4rem] font-semibold">
                      Patient Name:
                    </span>
                    <span className="text-sm font-semibold">
                      {appoinment.patientName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <MdMedicalServices size={20} className="text-green-600" />
                    <span className="text-[1.1.4rem] font-semibold">
                      Doctor Name:
                    </span>
                    <span className="text-sm font-semibold">
                      {appoinment.doctorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <MdDateRange size={20} className="text-red-600" />
                    <span className="text-[1.1.4rem] font-semibold">
                      Appointment Date:
                    </span>
                    <span className="font-semibold text-sm">
                      {new Date(appoinment.appointmentDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <TimerIcon size={20} className="text-green-600" />
                    <span className="text-[1.1.4rem] font-semibold">
                      Appointment time:
                    </span>
                    <span className="text-sm font-semibold">
                      {formatAppointmentTime(appoinment.appTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <MdInfoOutline size="20" />
                    <span className="text-[1.1.4rem] font-semibold">
                      Reason:
                    </span>
                    <span className="font-semibold text-sm">
                      {appoinment.reason}
                    </span>
                  </div>

                  <div className="flex gap-x-3 text text-slate-700">
                    <span
                      className={`flex items-center gap-3 font-semibold ${
                        appoinment.status === "Pending"
                          ? "text-yellow-500"
                          : appoinment.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {appoinment.status === "Pending" ? (
                        <MdPendingActions size="20" />
                      ) : appoinment.status === "Completed" ? (
                        <MdCheckCircleOutline />
                      ) : (
                        <MdCancel size="20" />
                      )}
                    </span>
                    <span className="text-[1.1.4rem] font-semibold">
                      {" "}
                      Status:
                    </span>

                    <span
                      className={`flex items-center gap-3 font-semibold ${
                        appoinment.status === "Pending"
                          ? "text-yellow-500"
                          : appoinment.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {appoinment.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between md:justify-end gap-3 mt-3 md:mt-0 ">
                  {/* here edit btn */}
                  <AppoinmentUpdate appoinment={appoinment} />
                  <Dialog open={dialogopen} onOpenChange={setDialogopen}>
                    <DialogTrigger>
                      <Button
                        variant="link"
                        className="flex items-center bg-gradient-to-r from-red-200 to-red-300 hover:from-red-100 hover:to-red-200 text-red-700 font-medium px-5 py-2 rounded-md shadow-sm hover:shadow-md transition-all transform hover:scale-105 space-x-2"
                      >
                        <MdDelete className="text-2xl" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-y-7 bg-white">
                      <DialogTitle>
                        <h1 className="text-black text-lg font-semibold">
                          Are you sure to delete this appointment..?
                        </h1>
                      </DialogTitle>

                      <div className="flex justify-end gap-x-4">
                        <Button
                          variant="outline"
                          className="bg-white text-black "
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        {loading ? (
                          <LoadingBtn />
                        ) : (
                          <Button
                            className="bg-red-600 text-white"
                            onClick={() => handleDelete(appoinment._id)}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <h2 className="text-xl font-semibold text-slate-600 text-center">
          No Appointments
        </h2>
      )}
    </div>
  )
}

export default AppinmetCard
