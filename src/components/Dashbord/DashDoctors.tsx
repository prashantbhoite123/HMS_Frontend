
import { FaUserMd } from "react-icons/fa"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

interface Doctor {
  _id: string
  doctorName: string
  email: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
}

type Props = {
  doctors: Doctor[]
}

const DashDoctors = ({ doctors }: Props) => {
  if (!doctors || doctors.length === 0) {
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
        <FaUserMd />
        <span>Doctors</span>
      </h1>
      <div className="mt-6">
        <span className="inline-flex py-1 shadow-lg px-4 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold text-white">
          <span>
            <span className="mr-2">{doctors?.length}</span>
            <span>Doctors</span>
          </span>
        </span>
        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700">
              <TableHead className="px-6 py-2 text-center font-semibold">
                #
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Doctor Name
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Email
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Education
              </TableHead>
              <TableHead className="px-6 py-2 text-center font-semibold">
                Experience
              </TableHead>
              <TableHead className="px-6 py-2 text-left font-semibold">
                Specialization
              </TableHead>
              <TableHead className="px-6 py-2 text-center font-semibold">
                Working Hours
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors?.map((doctor, i) => (
              <TableRow
                key={doctor._id}
                className="transition-all duration-300 hover:bg-gray-100 border-t border-gray-300"
              >
                <TableCell className="px-6 py-3 text-center font-semibold">
                  {i + 1}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {doctor.doctorName}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {doctor.email}
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {doctor.education}
                </TableCell>
                <TableCell className="px-6 py-3 text-center font-semibold">
                  {doctor.experienceYears} years
                </TableCell>
                <TableCell className="px-6 py-3 text-left font-semibold">
                  {doctor.specialization}
                </TableCell>
                <TableCell className="px-6 py-3 text-center font-semibold">
                  {doctor.workingHours}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashDoctors
