import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
            <TableHead className="px-4 py-3">#</TableHead>
            <TableHead className="px-4 py-3">Patient Name</TableHead>
            <TableHead className="px-4 py-3">Code</TableHead>
            <TableHead className="px-4 py-3">Status</TableHead>
            <TableHead className="px-4 py-3">Appoinment time</TableHead>
            <TableHead className="px-4 py-3">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestAppoinmet.map((app, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-50 border-t border-gray-300 font-semibold transition-all duration-200"
            >
              <TableCell className="px-4 py-3">{i + 1}</TableCell>
              <TableCell className="px-4 py-3">{app.patientName}</TableCell>
              <TableCell className="px-4 py-3">
                <span className="font-semibold text-sm text-green-500">
                  {app.apptNumber}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3">
                <span
                  className={`font-semibold text-sm px-2 py-1 rounded-md ${
                    app.status === "Completed"
                      ? "text-green-600"
                      : app.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {app.status}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3">{app.appTime}</TableCell>
              <TableCell className="px-4 py-3">
                {new Date(app.appointmentDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashDoctorLatestApp
