import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdEventNote } from "react-icons/md"

const DashRecentApp = () => {
  return (
    <div className="w-full overflow-scroll md:overflow-hidden p-2 shadow-xl rounded-md">
      <span className="flex items-center gap-x-2 text-[1.2rem] font-semibold ml-2 text-green-500">
        <MdEventNote />
        Latest Appoinment
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
          <TableRow>
            <TableCell>Prashant bhoite</TableCell>
            <TableCell>
              <span className="font-semibold text-sm bg-green-200 text-green-500 px-2 rounded-md">
                APPT-0345-PE
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-sm bg-orange-200 text-orange-500 px-2 rounded-md">
                Pending
              </span>
            </TableCell>
            <TableCell>Dr.Babitaji</TableCell>
            <TableCell>07/11/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Prashant bhoite</TableCell>
            <TableCell>APPT-0345-PE</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Dr.Babitaji</TableCell>
            <TableCell>07/11/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Prashant bhoite</TableCell>
            <TableCell>APPT-0345-PE</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Dr.Babitaji</TableCell>
            <TableCell>07/11/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Prashant bhoite</TableCell>
            <TableCell>APPT-0345-PE</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Dr.Babitaji</TableCell>
            <TableCell>07/11/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Prashant bhoite</TableCell>
            <TableCell>APPT-0345-PE</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Dr.Babitaji</TableCell>
            <TableCell>07/11/2024</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default DashRecentApp
