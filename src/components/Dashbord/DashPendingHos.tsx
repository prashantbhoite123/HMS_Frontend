import { Hospital } from "@/Types/DashTypes"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { HourglassIcon } from "lucide-react"
type Props = {
  pendingHospital: Hospital[]
}

const DashPendingHos = ({ pendingHospital }: Props) => {
  if (!pendingHospital || pendingHospital.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-xl font-semibold text-red-500"
              >
                Pending Hospitals Not Found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="w-full p-4 shadow-lg rounded-lg bg-white">
      <div className="text-center  bg-gradient-to-r from-indigo-600 to-pink-600 text-clip text-transparent bg-clip-text ">
        <h1 className="text-2xl font-semibold">Pending Hospitals</h1>
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center gap-x-2 py-2 px-4 shadow-lg rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold">
          <span>{pendingHospital?.length}</span>
          <span>Pending Hospitals</span>
        </span>

        <Table className="mt-4">
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-300">
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
                Phone Number
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
            {pendingHospital.map((hospital, index: number) => (
              <TableRow
                key={index}
                className="transition-all duration-300  hover:bg-gray-100 border-t border-slate-300 font-semibold hover:shadow-md hover:rounded-md"
              >
                <TableCell className="py-3 px-4">{index + 1}</TableCell>
                <TableCell className="py-3 px-4">
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    <img
                      src={hospital?.picture}
                      alt="hospital img"
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Link
                    to={`/requestedhos/${hospital?._id}`}
                    className="line-clamp-1"
                  >
                    {hospital?.hospitalName}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className=" bg-blue-300 text-black px-1 py-1 rounded-2xl">
                    <Link
                      to={`/detail/${hospital?._id}`}
                      className="flex justify-center items-center gap-x-2 "
                    >
                      <HourglassIcon size={15} />
                      {hospital?.status}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Link
                    to={`/requestedhos/${hospital?._id}`}
                    className="line-clamp-1"
                  >
                    {hospital?.hospitalType}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.phoneNumber}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.establishedDate &&
                      format(new Date(hospital?.establishedDate), "dd/MM/yyyy")}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Link to={`/requestedhos/${hospital?._id}`}>
                    {hospital?.totalBeds}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashPendingHos
