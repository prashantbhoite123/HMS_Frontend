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
  ApprovedHospital: Hospital[]
}

const DashAdminApproval = ({ ApprovedHospital }: Props) => {
  if (!ApprovedHospital || ApprovedHospital.length === 0) {
    return (
      <Table>
        <TableRow>
          <TableCell className="text-2xl font-semibold text-red-500">
            Approved hospital Not found
          </TableCell>
        </TableRow>
      </Table>
    )
  }

  return (
    <div className="">
      <div className="text-center bg-gradient-to-r from-indigo-600 to-pink-600 text-clip text-transparent bg-clip-text">
        <h1 className="text-2xl font-semibold text-center">
          Approved Hospitals
        </h1>
      </div>

      <div className="mt-4 shadow-lg p-2">
        <span className="inline-flex py-1 shadow-lg px-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold ml-4 text-slate-50">
          <span>
            <span className="mr-2">{ApprovedHospital.length}</span>
            <span>Approved Hospitals</span>
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
              <TableHead>Established Date</TableHead>
              <TableHead>Total Beds</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="mt-4">
            {ApprovedHospital.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-4 text-center text-gray-500"
                >
                  No Hospitals Found
                </TableCell>
              </TableRow>
            ) : (
              ApprovedHospital.map((hospital, index) => (
                <TableRow
                  key={index}
                  className="transition-all duration-300 hover:bg-gray-100 font-semibold hover:shadow-md hover:rounded-md"
                >
                  <TableCell className="py-3 px-4">{index + 1}</TableCell>
                  <TableCell className="py-3 px-4">
                    <Link to={`/detail/${hospital?._id}`}>
                      <img
                        src={hospital?.picture}
                        alt="hospital img"
                        className="w-10 h-10 rounded-full"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Link
                      to={`/detail/${hospital?._id}`}
                      className="line-clamp-1"
                    >
                      {hospital?.hospitalName}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Link
                      to={`/detail/${hospital?._id}`}
                      className="line-clamp-1"
                    >
                      {hospital?.hospitalType}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Link to={`/detail/${hospital?._id}`}>
                      {hospital?.phoneNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Link to={`/detail/${hospital?._id}`}>
                      {hospital?.establishedDate &&
                        !isNaN(new Date(hospital?.establishedDate).getTime()) &&
                        format(
                          new Date(hospital?.establishedDate),
                          "dd/MM/yyyy"
                        )}
                    </Link>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Link to={`/detail/${hospital?._id}`}>
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

export default DashAdminApproval
