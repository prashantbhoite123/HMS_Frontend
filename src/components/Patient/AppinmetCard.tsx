import { Hospital, TimerIcon, User } from "lucide-react"

import { Card, CardContent, CardHeader } from "../ui/card"
import { MdDateRange, MdDelete, MdInfoOutline } from "react-icons/md"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import LoadingBtn from "../LoadingBtn"
import { useState } from "react"
import AppoinmentUpdate, { AppointmentForm } from "./AppoinmentUpdate"
import { Progress } from "../ui/progress"
import { FaKey, FaUserMd } from "react-icons/fa"

export type Appointment = {
  _id: string
  patientName: string
  doctorName: string
  appointmentDate: Date
  apptNumber: string
  appTime: string // e.g., "13:00 - 14:00"
  hospitalId: {
    _id: string
    hospitalName: string
  }
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}

type Props = {
  appoinment: Appointment[]
  delApp: (appId: string) => void
  handleUpdateApp: (appId: string, updatedAppoinment: AppointmentForm) => void
  loading: boolean
  isLoading: boolean
}

const AppinmetCard = ({
  appoinment,
  delApp,
  loading,
  isLoading,
  handleUpdateApp,
}: Props) => {
  const [appoinments, setAppoinment] = useState<Appointment[]>(appoinment)
  const [dialogopen, setDialogopen] = useState(false)

  const handleDelete = async (appId: string) => {
    delApp(appId)
    setDialogopen(false)
    setAppoinment((prev) => prev.filter((app) => app._id !== appId))
  }

  const handleCancel = () => setDialogopen(false)

  const formatAppointmentTime = (timeSlot?: string): string => {
    if (!timeSlot) return "Time not available"

    const [start, end] = timeSlot.split(" - ")

    if (!start || !end) return "Invalid time format"

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":")
      const hourNum = parseInt(hour)
      const suffix = hourNum >= 12 ? "pm" : "am"
      const formattedHour = hourNum % 12 === 0 ? 12 : hourNum % 12
      return `${formattedHour}:${minute} ${suffix}`
    }

    return `${formatTime(start)} - ${formatTime(end)}`
  }

  return (
    <div className="flex flex-col p-2 md:p-6 gap-6 w-full md:w-[65vw] lg:w-[50vw]">
      {appoinments.length > 0 ? (
        appoinments.map((appoinment: Appointment) => (
          <Card
            key={appoinment._id}
            className="bg-gradient-to-r relative from-gray-50 to-gray-100 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-200 border border-gray-200"
          >
            <CardHeader>
              <div className="flex justify-end gap-3 absolute top-4 right-4">
                <AppoinmentUpdate
                  updatedApp={handleUpdateApp}
                  isLoading={isLoading}
                  appoinment={appoinment}
                />
                <Dialog open={dialogopen} onOpenChange={setDialogopen}>
                  <DialogTrigger>
                    <Button
                      variant="link"
                      className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      <MdDelete className="text-2xl" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col gap-y-5 bg-white p-5 rounded-md shadow-lg">
                    <DialogTitle>
                      <h1 className="text-gray-700 text-lg font-semibold">
                        Are you sure you want to delete this appointment?
                      </h1>
                    </DialogTitle>
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        className="bg-white text-red-700"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      {loading ? (
                        <LoadingBtn />
                      ) : (
                        <Button
                          className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white"
                          onClick={() => handleDelete(appoinment._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="p-6 ">
              {/* Main content of the card */}
              <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 items-center">
                <div className="flex flex-col gap-y-3">
                  {/* Card details */}
                  <div className="flex items-center gap-3 text-gray-800">
                    <Hospital size={17} className="text-green-500" />
                    <span className="text-lg font-semibold">Hospital:</span>
                    <span className="text-md ">
                      <span className=" text-green-500 font-bold py-1 px-2 ">
                        {appoinment?.hospitalId?.hospitalName}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaKey size={17} className="text-green-500" />
                    <span className="text-lg font-semibold">Code :</span>
                    <span className="text-md ">
                      <span className="bg-green-200 text-green-500 font-bold py-1 px-2 rounded-md shadow-md">
                        {appoinment?.apptNumber}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <User size={20} className="text-blue-500" />
                    <span className="text-lg font-semibold">Patient:</span>
                    <span className="text-md font-medium">
                      {appoinment?.patientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaUserMd size={20} className="text-green-500" />
                    <span className="text-lg font-semibold">Doctor:</span>
                    <span className="text-md font-medium">
                      {appoinment?.doctorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <MdDateRange size={20} className="text-red-500" />
                    <span className="text-lg font-semibold">Date:</span>
                    <span className="font-medium text-md">
                      {new Date(appoinment?.appointmentDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <TimerIcon size={20} className="text-green-500" />
                    <span className="text-lg font-semibold">Time:</span>
                    <span className="text-md font-medium">
                      {formatAppointmentTime(appoinment?.appTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-800">
                    <MdInfoOutline size={20} className="text-blue-400" />
                    <span className="text-lg font-semibold">Reason:</span>
                    <span className="font-medium text-md line-clamp-1">
                      {appoinment?.reason}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-semibold ${
                        appoinment.status === "Pending"
                          ? "text-yellow-600"
                          : appoinment.status === "Completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {appoinment.status}
                    </span>
                    <Progress
                      value={
                        appoinment.status === "Pending"
                          ? 33
                          : appoinment.status === "Completed"
                          ? 100
                          : 0
                      }
                      status={
                        appoinment.status === "Pending"
                          ? "warning"
                          : appoinment.status === "Completed"
                          ? "success"
                          : "error"
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <h2 className="text-xl font-semibold text-gray-600 text-center">
          No Appointments
        </h2>
      )}
    </div>
  )
}

export default AppinmetCard
