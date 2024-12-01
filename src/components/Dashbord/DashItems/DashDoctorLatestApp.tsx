import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdOutlineCheck } from "react-icons/md"
import { HourglassIcon } from "lucide-react"
import { IoIosWarning } from "react-icons/io"
import { Link } from "react-router-dom"
interface latestApp {
  _id: string
  patientName: string
  petientId: string
  hospitalId: string
  doctorName: string
  appointmentDate: string // ISO string format (2024-11-10T00:00:00.000Z)
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}

type Props = {
  latestAppoinmet: latestApp[] | null
}

const DashDoctorLatestApp = ({ latestAppoinmet }: Props) => {
  if (!latestAppoinmet || latestAppoinmet.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <span className="flex items-center gap-x-2 text-xl font-semibold ml-4 text-red-600">
          <span>No appointments available</span>
        </span>
      </div>
    )
  }

  return (
    <div className="w-full p-5 shadow-lg rounded-lg bg-white">
      <span className="inline-flex py-1.5 shadow-lg px-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-base font-semibold text-white">
        <span>
          <span className="mr-2">{latestAppoinmet?.length}</span>
          <span>Latest Pending Appointments</span>
        </span>
      </span>
      <Table className="mt-3 rounded-lg">
        <TableHeader className="text-gray-700">
          <TableRow className="bg-gray-200 text-gray-700 rounded-md">
            <TableHead className="border border-gray-300 text-center">
              #
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Patient Name
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Status
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Code
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Appoinment time
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestAppoinmet.map((app, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-50 border-t border-gray-300 font-semibold transition-all duration-200"
            >
              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>{i + 1}</Link>
              </TableCell>
              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>{app.patientName}</Link>
              </TableCell>
              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>
                  <div
                    className={`flex justify-center items-center text-black rounded-2xl ${
                      app?.status === "Completed"
                        ? "bg-green-300 text-green-800"
                        : app.status === "Pending"
                        ? "bg-blue-300 text-blue-900"
                        : "bg-red-300 text-red-600"
                    }`}
                  >
                    <span>
                      {app?.status === "Completed" ? (
                        <MdOutlineCheck size={15} />
                      ) : app?.status === "Pending" ? (
                        <HourglassIcon size={15} />
                      ) : (
                        <IoIosWarning size={15} />
                      )}
                    </span>
                    <span
                      className={`font-semibold text-sm px-2 py-1 rounded-md `}
                    >
                      {app?.status}
                    </span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>
                  <span className="font-semibold text-sm text-green-500">
                    {app.apptNumber}
                  </span>
                </Link>
              </TableCell>

              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>{app.appTime}</Link>
              </TableCell>
              <TableCell className="py-3 px-2 text-center">
                <Link to={`/profile/${app?.petientId}`}>
                  {new Date(app.appointmentDate).toLocaleDateString()}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashDoctorLatestApp
