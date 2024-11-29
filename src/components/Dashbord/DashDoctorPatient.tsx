import { PatientType } from "@/Types/DashTypes"

type Props = {
  patient: PatientType[]
}

import { FaUser } from "react-icons/fa"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { format } from "date-fns"

const DashDoctorPatient = ({ patient }: Props) => {
  if (!patient || patient.length === 0) {
    return (
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <span className="flex items-center gap-x-2 text-2xl font-semibold ml-4 text-red-600">
          <span>No doctor available</span>
        </span>
      </div>
    )
  }
  return (
    <div className="p-4 shadow-lg bg-white rounded-xl">
      <h1 className="text-green-500 font-semibold text-xl mb-6 flex items-center gap-x-2 justify-center">
        <FaUser />
        <span>Patients</span>
      </h1>
      <div className="mt-4">
        <span className="inline-flex py-1 shadow-lg px-4 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold text-white">
          <span>
            <span className="mr-2">{patient?.length}</span>
            <span>{patient.length <= 1 ? "Patient" : "Patients"}</span>
          </span>
        </span>
        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700">
              <TableHead className="px-6 py-2 text-center font-semibold">
                #
              </TableHead>
              <TableHead className="px-6 py-2 text-center font-semibold">
                Name
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Contact
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Address
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                gender
              </TableHead>
              <TableHead className="px-6 py-2 text-center font-semibold">
                age
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                dateOfBirth
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patient?.map((patient, i) => (
              <TableRow
                key={patient._id}
                className="transition-all duration-300 hover:bg-gray-100 border-t border-gray-300"
              >
                <TableCell className="px-6 py-3 text-center font-semibold">
                  {i + 1}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {patient?.name}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {patient?.phone}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {patient?.address?.city}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {patient?.gender}
                </TableCell>
                <TableCell className="px-6 py-3 text-center font-semibold">
                  {patient?.age}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {format(new Date(patient?.dateOfBirth), "dd/MM/yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashDoctorPatient
