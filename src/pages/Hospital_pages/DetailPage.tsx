import { useMygetHospital } from "@/Api/Hospital/useMyHospitalDetails"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Notebook, Phone } from "lucide-react"
import { MdDateRange, MdLocationOn } from "react-icons/md"
import { useParams } from "react-router-dom"
import { FaHospitalAlt, FaConciergeBell, FaBuilding } from "react-icons/fa"
import {
  FaUserMd,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaBed,
} from "react-icons/fa" // Icons for doctor information
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import HosImageDialog from "@/components/Hospital/HosImageDialog"

import Appoinment from "@/form/Patient/Appoinment"
import { useMyAppoinment } from "@/Api/patient/useMyAppoinment"
import Loader from "@/components/Loader"

const DetailPage = () => {
  const { hospitalId } = useParams()
  const { appoinment, isLoading: appLoading } = useMyAppoinment(
    hospitalId as string
  )
  const { getHospital, isLoading, isError } = useMygetHospital(
    hospitalId as string
  )

  if (isLoading) {
    return (
      <div className="h-full  w-full flex justify-center items-center">
        <div className="loader">
          <Loader />
        </div>
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

  const formatedDate = getHospital.establishedDate
    ? (() => {
        const date = new Date(getHospital.establishedDate)
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
      })()
    : ""
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

        <div className="p-4 ml-5 flex flex-col  gap-4">
          <h1 className="text-2xl md:text-4xl font-semibold">
            {getHospital.hospitalName}
          </h1>
          <h2 className="text-xl md:text-2xl">{getHospital.hospitalType}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 text-sm font-semibold">
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
                <span>
                  {getHospital.description || "No description available"}
                </span>
              </div>
            </div>
            <div className="ml-3 gap-6 text-sm font-semibold">
              <div className="flex gap-2 items-center">
                <MdDateRange />
                <span className="">{formatedDate}</span>
              </div>
              <div className="flex gap-2 items-center">
                <FaBed />
                <span>{getHospital.totalBeds}</span>
              </div>
            </div>
          </div>
          <Appoinment
            onSave={appoinment}
            isLoading={appLoading}
            doctors={getHospital.doctors}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10 shadow-lg">
        <div className="flex items-center mb-4">
          <FaUserMd className="text-blue-500 mr-2" size={24} />
          <h2 className="text-xl font-bold">Doctors</h2>
        </div>
        <div className="flex flex-col flex-wrap space-y-6  md:flex-row w-full justify-center items-center  p-2 mt-4 gap-4 ">
          {getHospital.doctors.map((doctor: any, index: number) => (
            <Card
              key={index}
              className="w-full md:w-[25vw] p-2 bg-white shadow-xl shadow-slate-400 rounded-md"
            >
              <CardHeader>
                <div className="flex justify-center items-center">
                  <img
                    className="size-24 rounded-full"
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
                      Dr. {doctor.doctorName}
                    </span>
                  </div>
                  <div className="flex justify-around w-full gap-4">
                    <div className="flex flex-col">
                      <span className="flex text-sm font-semibold items-center mb-1 gap-2">
                        <FaGraduationCap
                          size="20"
                          className="mr-2 text-gray-500"
                        />
                        <span>{doctor.education}</span>
                      </span>
                      <span className="flex text-sm font-semibold items-center mb-1">
                        <FaStethoscope
                          size="20"
                          className="mr-2 text-gray-500"
                        />
                        <span>{doctor.specialization}</span>
                      </span>
                    </div>
                    <div className="flex flex-col ml-2 ">
                      <span className="flex text-sm font-semibold items-center mb-1 gap-2">
                        <FaCalendarAlt
                          size="20"
                          className="mr-2 text-gray-500"
                        />
                        <span>{doctor.experienceYears} years</span>
                      </span>
                      <span className="flex text-sm font-semibold items-center">
                        <FaClock size="20" className="mr-2 text-gray-500" />
                        <span>{doctor.workingHours} hours</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full p-5 mt-6  shadow-md flex flex-col gap-8">
          {/* Departments Section */}
          <div className="w-full p-4 bg-white rounded-lg">
            <div className="flex justify-center items-center mb-4">
              <FaBuilding className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl font-bold">Departments</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {getHospital.departments.map((dept: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-md shadow-md"
                >
                  <FaHospitalAlt className="text-blue-500" size={20} />{" "}
                  {/* Department Icon */}
                  <span className="text-lg font-medium">{dept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="w-full p-4 bg-white rounded-md">
            <div className="flex justify-center items-center mb-4">
              <FaConciergeBell className="text-green-500 mr-2" size={24} />
              <h2 className="text-xl font-bold">Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {getHospital.services.map((service: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-md shadow-md"
                >
                  <FaConciergeBell className="text-green-500" size={20} />{" "}
                  {/* Service Icon */}
                  <span className="text-lg font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
