import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

function DashAppoinment() {
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
            <TableRow>
              <TableCell>Prashant bhoite</TableCell>
              <TableCell>fdkgjfd</TableCell>
              <TableCell>Andu pandu</TableCell>
              <TableCell>fkhgkdfhg</TableCell>
              <TableCell>fkhgkdfhg</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>dukhatay</TableCell>
              <TableCell>
                <Button>Del</Button>
              </TableCell>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashAppoinment
