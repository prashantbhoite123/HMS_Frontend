import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import { MdEventNote } from "react-icons/md"

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
  latestAppoinment: latestApp[] | null
}

const DashRecentApp = ({ latestAppoinment }: Props) => {
  // Make sure latestAppoinment is correctly accessed
  if (!latestAppoinment || latestAppoinment.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-green-600">
          {/* <MdEventNote /> */}
          <span>No appointments available</span>
        </span>
      </div>
    )
  }

  return (
    <div className="w-full p-4 shadow-lg rounded-lg bg-white">
      <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-green-600">
        <span>
          <span className="mr-2">{latestAppoinment?.length}</span>
          <span>Latest Appointments</span>
        </span>
      </span>

      <Table className="mt-4">
        <TableHeader className=" text-gray-700">
          <TableRow className="text-[1.1rem]">
            <TableHead className="py-3 px-4 text-left">Patient Name</TableHead>
            <TableHead className="py-3 px-4 text-left">Code</TableHead>
            <TableHead className="py-3 px-4 text-left">Status</TableHead>
            <TableHead className="py-3 px-4 text-left">Doctor Name</TableHead>
            <TableHead className="py-3 px-4 text-left">Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          { latestAppoinment.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                No Appointments Found
              </TableCell>
            </TableRow>
          ) : (
            latestAppoinment.map((app, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="py-3 px-4 font-semibold">
                  {app.patientName}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <span className="font-semibold text-sm bg-green-200 text-green-500 px-3 py-1 rounded-md">
                    {app.apptNumber}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <span
                    className={`font-semibold text-sm px-3 py-1 rounded-md ${
                      app.status === "Completed"
                        ? " text-green-600"
                        : app.status === "Pending"
                        ? " text-yellow-600"
                        : " text-red-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-4 font-semibold">
                  {app.doctorName}
                </TableCell>
                <TableCell className="py-3 px-4 font-semibold">
                  {new Date(app.appointmentDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashRecentApp
