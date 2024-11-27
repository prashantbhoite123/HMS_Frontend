import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Hospital } from "@/Types/DashTypes"
import { format } from "date-fns"
import { Link } from "react-router-dom"

type Props = {
  recentPenHos: Hospital[]
}

const DashRecentPendingHos = ({ recentPenHos }: Props) => {
  console.log("recentp==>", recentPenHos)
  if (!recentPenHos || recentPenHos.length === 0) {
    return (
      <div>
        <Table>
          <TableBody>
            <TableRow className="shadow-xl shadow-slate-200">
              <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                No pending Hospial Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
  return (
    <div className="w-full p-4 shadow-lg rounded-lg bg-whites">
      <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-green-600">
        <span>
          <span className="mr-2">{recentPenHos?.length}</span>
          <span>Latest Pending Hospital</span>
        </span>
      </span>
      <Table>
        <TableHeader className=" text-gray-700 border-none">
          <TableRow>
            <TableHead>Picture</TableHead>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Hospital Type</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>EstablishedDate</TableHead>
            <TableHead>Total Beds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="mt-4">
          {recentPenHos?.length === 0 ? (
            <TableRow className="hover:bg-gray-50 transition-colors duration-200 border-none">
              <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                No Hospital Found
              </TableCell>
            </TableRow>
          ) : (
            recentPenHos?.map((hospital, index: number) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 border-none"
              >
                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    <img
                      src={hospital?.picture}
                      alt="hospital img"
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.hospitalName}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.hospitalType}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.phoneNumber}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.establishedDate &&
                      format(new Date(hospital?.establishedDate), "dd/MM/yyyy")}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.totalBeds}
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashRecentPendingHos
