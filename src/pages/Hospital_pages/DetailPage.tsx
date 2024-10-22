import { useMygetHospital } from "@/Api/Hospital/useMyHospitalDetails"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Notebook, Phone } from "lucide-react"
import { MdLocationOn } from "react-icons/md"
import { useParams } from "react-router-dom"

import {
  FaUserMd,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
} from "react-icons/fa" // Icons for doctor information
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import HosImageDialog from "@/components/Hospital/HosImageDialog"

const DetailPage = () => {
  const { hospitalId } = useParams()
  const { getHospital, isLoading, isError } = useMygetHospital(
    hospitalId as string
  )

  if (isLoading) {
    return (
      <div className="h-screen  w-full flex justify-center items-center">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  if (isError || !getHospital) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <p className="text-red-500">
          Unable to load hospital details. Please try again.
        </p>
      </div>
    )
  }
  return (
    <div className=" w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center p-4  bg-white shadow-lg ">
        <Dialog>
          <DialogTrigger>
            <img
              className="rounded-full ml-4 md:ml-0 h-[25vw] w-[25vw] md:h-[15vw] md:w-[15vw] object-cover"
              src={getHospital.picture || "/default-hospital.jpg"}
              alt={getHospital.hospitalName}
            />
          </DialogTrigger>
          <HosImageDialog picture={getHospital.picture} />
        </Dialog>

        <div className="p-4 ml-5 flex flex-col gap-4">
          <h1 className="text-2xl md:text-4xl font-semibold">
            {getHospital.hospitalName}
          </h1>
          <h2 className="text-xl md:text-2xl">{getHospital.hospitalType}</h2>

          <div className="flex items-center gap-2 text-gray-700">
            <MdLocationOn size={20} />
            <span>{`${getHospital.address.city}, ${getHospital.address.state}, ${getHospital.address.country}`}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={20} />
            <span>{getHospital.phoneNumber}</span>
          </div>

          {/* Description */}
          <div className="flex items-center gap-2 text-gray-700">
            <Notebook size={20} />
            <span>{getHospital.description || "No description available"}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        <h1 className="mt-5 text-2xl font-semibold">Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 p-2 mt-4 gap-4 ">
          {getHospital.doctors.map((doctor: any, index: number) => (
            <Card
              key={index}
              className="w-full  p-2 bg-white shadow-lg rounded-md"
            >
              <CardHeader>
                <div className="flex justify-center items-center">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={
                      doctor.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQN5aeH5PWbBb2Ws7lZnlJ6VJviegkHLgbhg&s"
                    }
                    alt={doctor.doctorName || "Doctor image"}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 items-center text-center">
                  <div className="mb-2">
                    <FaUserMd className="inline mr-2 text-blue-500" />
                    <span className="font-semibold text-lg">
                      {doctor.doctorName}
                    </span>
                  </div>
                  <div className="flex justify-around w-full">
                    <div className="flex flex-col">
                      <span className="flex items-center mb-1 gap-2">
                        <FaGraduationCap className="mr-2 text-gray-500" />
                        <span>{doctor.education}</span>
                      </span>
                      <span className="flex items-center mb-1">
                        <FaStethoscope className="mr-2 text-gray-500" />
                        <span>{doctor.specialization}</span>
                      </span>
                    </div>
                    <div className="flex flex-col ml-2 ">
                      <span className="flex items-center mb-1 gap-2">
                        <FaCalendarAlt className="mr-2 text-gray-500" />
                        <span>{doctor.experienceYears} years</span>
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-2 text-gray-500" />
                        <span>{doctor.workingHours} hours</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailPage
