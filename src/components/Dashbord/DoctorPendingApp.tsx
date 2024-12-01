import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { FaNotesMedical } from "react-icons/fa"
import DashCancelAppResonPop from "./DashCancelAppResonPop"

interface Appointment {
  _id: string
  patientName: string
  petientId: string
  hospitalId: string
  doctorName: string
  appointmentDate: Date
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}
import { MdOutlineCheck } from "react-icons/md"
import { HourglassIcon } from "lucide-react"
import { IoIosWarning } from "react-icons/io"
import DashScheduleAppPop from "./DashScheduleAppPop"
import { Link } from "react-router-dom"

type Props = {
  allAppoinment: Appointment[]
  cancelApp: (reson: string, appId: string) => void
  scheduleApp: (appId: string) => void
  Loading: boolean
  isLoading: boolean
}

function DoctorPendingApp({
  allAppoinment,
  cancelApp,
  scheduleApp,
  Loading,
  isLoading,
}: Props) {
  const handleCancel = (reson: string, appId: string) => {
    cancelApp(reson, appId)
  }

  if (!allAppoinment || allAppoinment.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-red-600">
          <span>No appointments available</span>
        </span>
      </div>
    )
  }

  return (
    <div className="shadow-lg p-2 md:p-4 shadow-slate-400 rounded-xl overflow-auto">
      <h1 className="text-green-500 font-semibold text-xl mb-4 flex items-center gap-x-2 justify-center">
        <FaNotesMedical />
        <span>Appointments</span>
      </h1>
      <div className="mt-4">
        <span className="inline-flex py-1 shadow-lg px-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold ml-4 text-slate-50">
          <span>
            <span className="mr-2">{allAppoinment?.length}</span>
            <span>Appointments</span>
          </span>
        </span>
        <Table className="w-full bg-white shadow-sm rounded-lg overflow-hidden mt-4 border-collapse border border-gray-200">
          <TableHeader>
            <TableRow className="bg-slate-200">
              <TableHead className="border border-gray-300 text-center">
                #
              </TableHead>
              <TableHead className="border border-gray-300 text-left">
                Patient Name
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Status
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Code
              </TableHead>

              <TableHead className="border border-gray-300 text-left">
                Doctor Name
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Schedule
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Cancel
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppoinment?.map((allApp, index) => (
              <TableRow
                key={allApp._id}
                className="transition-all duration-300 hover:bg-gray-100 border-t border-gray-300 font-semibold hover:shadow-md"
              >
                <TableCell className="py-3 px-2 text-center">
                  <Link to={`/profile/${allApp?.petientId}`}>{index + 1}</Link>
                </TableCell>
                <TableCell className="py-3 px-2 text-left line-clamp-1">
                  <Link to={`/profile/${allApp?.petientId}`}>
                    {allApp?.patientName}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-2 text-center">
                  <Link to={`/profile/${allApp?.petientId}`}>
                    <div
                      className={`flex justify-center items-center text-black rounded-2xl ${
                        allApp?.status === "Completed"
                          ? "bg-green-300 text-green-800"
                          : allApp.status === "Pending"
                          ? "bg-blue-300 text-blue-900"
                          : "bg-red-300 text-red-600"
                      }`}
                    >
                      <span>
                        {allApp?.status === "Completed" ? (
                          <MdOutlineCheck size={15} />
                        ) : allApp?.status === "Pending" ? (
                          <HourglassIcon size={15} />
                        ) : (
                          <IoIosWarning size={15} />
                        )}
                      </span>
                      <span
                        className={`font-semibold text-sm px-2 py-1 rounded-md `}
                      >
                        {allApp?.status}
                      </span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-2  text-center">
                  <Link to={`/profile/${allApp?.petientId}`}>
                    <div className="text-green-400 font-bold rounded-full">
                      {allApp?.apptNumber}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4 text-left">
                  <Link to={`/profile/${allApp?.petientId}`}>
                    {allApp?.doctorName}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-6 text-center cursor-pointer text-blue-500">
                  <DashScheduleAppPop
                    scheduleApp={scheduleApp}
                    appId={allApp?._id}
                    Loading={Loading}
                    appData={{
                      doctorName: allApp?.doctorName,
                      appDate: allApp?.appointmentDate,
                      appTime: allApp?.appTime,
                      reson: allApp?.reason,
                    }}
                  />
                </TableCell>
                <TableCell className="py-3 px-6 text-center cursor-pointer text-red-500">
                  <DashCancelAppResonPop
                    appId={allApp?._id}
                    cancelApp={handleCancel}
                    loading={isLoading}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DoctorPendingApp
