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
              <TableCell colSpan={6} className="py-3 text-center text-gray-500">
                No Pending Hospitals Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="w-full p-4 shadow-lg rounded-lg bg-white">
      <span className="inline-flex py-1.5 px-3 shadow-lg rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold text-white">
        <span>
          <span className="mr-2">{recentPenHos?.length}</span>
          <span>Latest Pending Hospitals</span>
        </span>
      </span>
      <Table className="mt-4">
        <TableHeader className="text-gray-700 border-none">
          <TableRow className="bg-slate-200">
            <TableHead className="border border-gray-300 text-center">
              #
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Picture
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Hospital Name
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Status
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Hospital Type
            </TableHead>

            <TableHead className="border border-gray-300 text-center">
              Established Date
            </TableHead>
            <TableHead className="border border-gray-300 text-center">
              Total Beds
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentPenHos?.map((hospital, index: number) => (
            <TableRow
              key={index}
              className="transition-all duration-300 hover:bg-gray-100 border-t  font-semibold hover:shadow-md hover:rounded-md"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="py-3">
                <Link to={`/requestedhos/${hospital?._id}`}>
                  <img
                    src={hospital?.picture}
                    alt="hospital img"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              </TableCell>
              <TableCell className="py-3">
                <Link
                  to={`/requestedhos/${hospital?._id}`}
                  className="line-clamp-1"
                >
                  {hospital?.hospitalName}
                </Link>
              </TableCell>
              <TableCell className="py-3">
                <Link
                  to={`/requestedhos/${hospital?._id}`}
                  className="line-clamp-1"
                >
                  {hospital?.hospitalType}
                </Link>
              </TableCell>
              <TableCell className="py-3">
                <Link to={`/requestedhos/${hospital?._id}`}>
                  {hospital?.phoneNumber}
                </Link>
              </TableCell>
              <TableCell className="py-3">
                <Link to={`/requestedhos/${hospital?._id}`}>
                  {hospital?.establishedDate &&
                    format(new Date(hospital?.establishedDate), "dd/MM/yyyy")}
                </Link>
              </TableCell>
              <TableCell className="py-3">
                <Link to={`/requestedhos/${hospital?._id}`}>
                  {hospital?.totalBeds}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DashRecentPendingHos
