import { FaUserMd } from "react-icons/fa"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Link } from "react-router-dom"

interface Doctor {
  role: string
  _id: string
  doctorName: string
  profilepic: string
  degree: string
  email: string
  ownerId: string
  hospitalId: string
  password: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
  __v: number
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
      <div className="mt-4">
        <span className="inline-flex py-1 shadow-lg px-4 rounded-md bg-gradient-to-r from-indigo-600 to-pink-600 items-center gap-x-2 text-lg font-semibold text-white">
          <span>
            <span className="mr-2">{doctors?.length}</span>
            <span>Doctors</span>
          </span>
        </span>
        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-4">
          <TableHeader>
            <TableRow className="bg-gray-200 text-gray-700">
              <TableHead className="border border-gray-300 text-center">
                #
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Picture
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Doctor Name
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Email
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Education
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Experience
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Specialization
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                WH
              </TableHead>
              <TableHead className="border border-gray-300 text-center">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors?.map((doctor, i) => (
              <TableRow
                key={doctor._id}
                className="transition-all duration-300 hover:bg-gray-100 border-t border-gray-300"
              >
                <TableCell className="px-4 py-3 text-center font-semibold">
                  {i + 1}
                </TableCell>
                <TableCell className="px-4 py-3 text-left font-semibold">
                  <Link to={`/doctorprofile/${doctor?._id}`}>
                    <img
                      src={doctor?.profilepic}
                      alt="profilepic"
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                </TableCell>
                <TableCell className="px-4 py-3 text-left font-semibold">
                  {doctor?.doctorName}
                </TableCell>
                <TableCell className="px-4 py-3 text-left font-semibold">
                  {doctor?.email}
                </TableCell>
                <TableCell className="px-4 py-3 text-left font-semibold">
                  {doctor.education}
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold">
                  {doctor.experienceYears} years
                </TableCell>
                <TableCell className="px-4 py-3 text-left font-semibold">
                  {doctor.specialization}
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold">
                  {doctor.workingHours}
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold">
                  Delete
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
