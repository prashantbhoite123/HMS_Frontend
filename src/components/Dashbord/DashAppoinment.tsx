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
    <div>
      <h1 className="text-green-500 font-semibold text-xl">Appoinments</h1>
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>UpdateApp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppoinment?.map((allApp) => (
              <TableRow className="font-semibold">
                <TableCell>{allApp?.patientName}</TableCell>
                <TableCell>{allApp?.apptNumber}</TableCell>
                <TableCell>{allApp?.doctorName}</TableCell>
                <TableCell>
                  {new Date(allApp?.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{allApp?.appTime}</TableCell>
                <TableCell>{allApp?.status}</TableCell>
                <TableCell className="line-clamp-1">{allApp?.reason}</TableCell>

                <TableCell>
                  <Button className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                    <FcCancel />
                  </Button>
                </TableCell>
                <TableCell>
                  <input type="checkbox" />
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
