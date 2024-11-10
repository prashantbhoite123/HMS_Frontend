import { FcCancel } from "react-icons/fc"
import { Button } from "../ui/button"
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
  appointmentDate: string // ISO string format (2024-11-10T00:00:00.000Z)
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string // ISO string format
}

type Props = {
  allAppoinment: Appointment[]
}

function DashAppoinment({ allAppoinment }: Props) {
  return (
    <div className=" shadow-lg p-2 md:p-4 shadow-slate-400 rounded-xl">
      <h1 className="text-green-500 font-semibold text-xl mb-4 flex items-center gap-x-2 justify-center">
        <FaNotesMedical />
        <span>Appointments</span>
      </h1>
      <div className="mt-4">
        <Table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <TableHeader className="">
            <TableRow className="text-[1.1rem]">
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Patient Name
              </TableHead>
              <TableHead className="py-3 px-9 font-semibold text-green-500">
                Code
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Doctor Name
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Date
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Time
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Status
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Reason
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Cancel
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Update
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppoinment?.map((allApp) => (
              <TableRow
                key={allApp._id}
                className="transition-all duration-300 hover:bg-gray-100 border-none font-semibold hover:shadow-md hover:rounded-md"
              >
                <TableCell className="py-3 px-2 font-semibold">
                  {allApp?.patientName}
                </TableCell>
                <TableCell className="py-3 px-2">
                  <span className="font-semibold text-sm text-green-500 px-3 py-1 rounded-md">
                    {allApp?.apptNumber}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-2">
                  {allApp?.doctorName}
                </TableCell>
                <TableCell className="py-3 px-2">
                  {new Date(allApp?.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-3 px-4">{allApp?.appTime}</TableCell>
                <TableCell className="py-3 px-4">
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
                <TableCell className="py-3 px-2 line-clamp-2">
                  {allApp?.reason}
                </TableCell>

                <TableCell className="py-3 px-2">
                  <Button className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                    <FcCancel />
                  </Button>
                </TableCell>
                <TableCell className="py-3 px-6">
                  {/* <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                    Update
                  </Button> */}
                  <input type="checkbox" className="h-4 w-4" />
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
