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
  if (!allAppoinment || allAppoinment.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-red-600">
          {/* <MdEventNote /> */}
          <span>No appointments available</span>
        </span>
      </div>
    )
  }
  return (
    <div className=" shadow-lg p-2 md:p-4 shadow-slate-400 rounded-xl">
      <h1 className="text-green-500 font-semibold text-xl mb-4 flex items-center gap-x-2 justify-center">
        <FaNotesMedical />
        <span>Appointments</span>
      </h1>
      <div className="mt-4">
        <Table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="text-[1.1rem]">
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                #
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Patient Name
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                status
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Date
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Time
              </TableHead>
              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Doctor Name
              </TableHead>

              <TableHead className="py-3 px-3 font-semibold text-green-500">
                Update
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppoinment?.map((allApp, index) => (
              <TableRow
                key={allApp._id}
                className="transition-all duration-300 hover:bg-gray-100 border-none font-semibold hover:shadow-md hover:rounded-md"
              >
                <TableCell className="py-3 px-2 font-semibold">
                  {index + 1}
                </TableCell>
                <TableCell className="py-3 px-2 font-semibold">
                  {allApp?.patientName}
                </TableCell>

                <TableCell className="py-3 px-2">
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
                <TableCell className="py-3 px-2">
                  {new Date(allApp?.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-3 px-4">{allApp?.appTime}</TableCell>
                <TableCell className="py-3 px-4">
                  {allApp?.doctorName}
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
