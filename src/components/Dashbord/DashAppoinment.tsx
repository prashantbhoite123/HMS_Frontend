import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { FaNotesMedical } from "react-icons/fa"

interface Appointment {
  _id: string
  patientName: string
  petientId: string
  hospitalId: string
  doctorName: string
  appointmentDate: string
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}

type Props = {
  allAppoinment: Appointment[]
}

function DashAppoinment({ allAppoinment }: Props) {
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
                Date
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Time
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
                  {index + 1}
                </TableCell>
                <TableCell className="py-3 px-2 text-left line-clamp-1">
                  {allApp?.patientName}
                </TableCell>
                <TableCell className="py-3 px-2 text-center">
                  <span
                    className={`font-semibold text-sm px-2 py-1 rounded-md ${
                      allApp?.status === "Completed"
                        ? "text-green-600"
                        : allApp?.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {allApp?.status}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-2 text-center">
                  {new Date(allApp?.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-3 px-4 text-center">
                  {allApp?.appTime}
                </TableCell>
                <TableCell className="py-3 px-4 text-left">
                  {allApp?.doctorName}
                </TableCell>
                <TableCell className="py-3 px-6 text-center cursor-pointer text-blue-500">
                  Schedule
                </TableCell>
                <TableCell className="py-3 px-6 text-center cursor-pointer text-red-500">
                  Cancel
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashAppoinment
