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
          {/* <MdEventNote /> */}
          <span>No doctor available available</span>
        </span>
      </div>
    )
  }
  return (
    <div className=" p-4 shadow-lg bg-white rounded-xl">
      <h1 className="text-green-500 font-semibold text-xl mb-4 flex items-center gap-x-2 justify-center">
        <FaUserMd />
        <span>Doctors</span>
      </h1>
      <div className="mt-3">
        <Table className="w-full  rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className=" text-white">
              <TableHead className="py-4 px-2 text-green-500">
                Doctor Name
              </TableHead>
              <TableHead className="py-4 px-2 text-green-500">Email</TableHead>
              <TableHead className="py-4 px-2 text-green-500">
                Education
              </TableHead>
              <TableHead className="py-4 px-2 text-green-500">
                Experience
              </TableHead>
              <TableHead className="py-4 px-2 text-green-500">
                Specialization
              </TableHead>
              <TableHead className="py-4 px-2 text-green-500">
                Working Hours
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mt-2">
            {doctors?.map((doctor) => (
              <TableRow
                key={doctor._id}
                className="border-none transition-all duration-300 hover:bg-gray-100 font-semibold hover:shadow-md hover:rounded-md"
              >
                <TableCell className="py-4 px-2  font-medium">
                  {doctor.doctorName}
                </TableCell>
                <TableCell className="py-4 px-2 ">{doctor.email}</TableCell>
                <TableCell className="py-4 px-2 ">{doctor.education}</TableCell>
                <TableCell className="py-4 px-2 ">
                  {doctor.experienceYears} years
                </TableCell>
                <TableCell className="py-4 px-2 ">
                  {doctor.specialization}
                </TableCell>
                <TableCell className="py-4 px-2 ">
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
