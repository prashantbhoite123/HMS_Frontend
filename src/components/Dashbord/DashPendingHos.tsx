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

type Props = {
  pendingHospital: Hospital[]
}
const DashPendingHos = ({ pendingHospital }: Props) => {
  if (!pendingHospital || pendingHospital.length === 0) {
    return (
      <Table>
        <TableRow>
          <TableCell className="text-2xl text-red-500">
            Pending hospital Not found
          </TableCell>
        </TableRow>
      </Table>
    )
  }
  return (
    <div className="">
      <div className="shadow-lg  p-2 px-4 rounded-md">
        <h1 className="text-2xl font-semibold text-center">
          Pending Hospitals
        </h1>
      </div>

      <div className="mt-6 shadow-lg p-2">
        <span className="inline-flex py-1 shadow-lg  px-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg  font-semibold ml-4 text-slate-50">
          <span>
            <span className="mr-2">{pendingHospital?.length}</span>
            <span> Pending Hospitals</span>
          </span>
        </span>
        <Table className="mt-4">
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead>#</TableHead>
              <TableHead>Picture</TableHead>
              <TableHead>Hospital Name</TableHead>
              <TableHead>Hospital Type</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>EstablishedDate</TableHead>
              <TableHead>Total Beds</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mt-4">
            {pendingHospital?.length === 0 ? (
              <TableRow className="transition-all duration-300 hover:bg-gray-100 border-none font-semibold hover:shadow-md hover:rounded-md">
                <TableCell
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No Hospital Found
                </TableCell>
              </TableRow>
            ) : (
              pendingHospital?.map((hospital, index: number) => (
                <TableRow
                  key={index}
                  className="transition-all duration-300 hover:bg-gray-100 border-none font-semibold hover:shadow-md hover:rounded-md"
                >
                  <TableCell>{index + 1}</TableCell>
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
                    <Link
                      to={`/requestedhos/${hospital?._id}`}
                      className="line-clamp-1"
                    >
                      {hospital?.hospitalName}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      to={`/requestedhos/${hospital?._id}`}
                      className="line-clamp-1"
                    >
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
                        format(
                          new Date(hospital?.establishedDate),
                          "dd/MM/yyyy"
                        )}
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
    </div>
  )
}

export default DashPendingHos
