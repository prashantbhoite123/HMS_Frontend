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
  doctorName: string
  appointmentDate: Date
  apptNumber: string
  appTime: string
  hospitalId: string
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}
type Props = {
  latestAppoinment: latestApp[]
  loading: boolean
}

const DashRecentApp = ({ latestAppoinment, loading }: Props) => {
  return (
    <div className="w-full overflow-scroll md:overflow-hidden p-2 shadow-xl rounded-md">
      <span className="flex items-center gap-x-2 text-[1.2rem] font-semibold ml-2 text-green-500">
        {/* <MdEventNote /> */}
        <span className="">
          <span className="mr-2">{latestAppoinment.length}</span>
          <span>Latest Appoinment</span>
        </span>
      </span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <h1>"Loading...</h1>
          ) : (
            latestAppoinment?.map((app, i) => (
              <TableRow key={i}>
                <TableCell>{app.patientName}</TableCell>
                <TableCell>
                  <span className="font-semibold text-sm bg-green-200 text-green-500 px-2 rounded-md">
                    {app.apptNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-sm bg-orange-200 text-orange-500 px-2 rounded-md">
                    {app.status}
                  </span>
                </TableCell>
                <TableCell>{app.doctorName}</TableCell>
                <TableCell>
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
