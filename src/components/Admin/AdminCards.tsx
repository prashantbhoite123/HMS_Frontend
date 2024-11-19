import { IHospital } from "@/Types/hospital"
import { Card, CardContent, CardHeader } from "../ui/card"
import { FaPhone } from "react-icons/fa"
import { Bed, Dot } from "lucide-react"
import { Button } from "../ui/button"
import { BsWatch } from "react-icons/bs"

type Props = {
  hospitals: IHospital
}

const AdminCards = ({ hospitals }: Props) => {
  return (
    <div className="p-4">
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Hospital Name and Type */}
            <div className="text-lg font-semibold text-green-600 flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
              <span>{hospitals.hospitalName}</span>
              <span className="text-gray-500 text-sm">
                {hospitals.hospitalType}
              </span>
            </div>

            {/* Contact Information */}
            <div className="flex items-center gap-2 text-blue-500">
              <FaPhone />
              <span>{hospitals.phoneNumber}</span>
            </div>

            {/* Bed Information */}
            <div className="flex items-center gap-2 text-gray-700">
              <Bed />
              <span>{hospitals.totalBeds} Beds</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <BsWatch />
              <span>{new Date(hospitals.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Location Information */}
            <div className="flex flex-wrap gap-2 text-gray-600 font-medium text-sm">
              <span className="flex items-center">
                <Dot size={14} />
                {hospitals.address.country}
              </span>
              <span className="flex items-center">
                <Dot size={14} />
                {hospitals.address.state}
              </span>
              <span className="flex items-center">
                <Dot size={14} />
                {hospitals.address.city}
              </span>
            </div>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={
                typeof hospitals.picture === "string"
                  ? hospitals.picture // Use directly if it's a string
                  : hospitals.picture instanceof File
                  ? URL.createObjectURL(hospitals.picture) // Use createObjectURL for File
                  : "default-image-url.jpg" // Fallback for invalid cases
              }
              alt="Hospital"
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Services Section */}
            <div className="p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold text-center text-green-600">
                Services
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {hospitals.services?.slice(0, 8).map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-800 text-sm"
                  >
                    {service.length - 1 && <Dot size={14} />}
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Departments Section */}
            <div className="p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold text-center text-blue-600">
                Departments
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {hospitals.departments?.slice(0, 8).map((dep, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-800 text-sm"
                  >
                    {dep.length - 1 && <Dot size={14} />}
                    {dep}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-2 space-y-4 md:space-y-0 space-x-4">
              <Button
                variant="outline"
                className="text-red-500 font-bold shadow-xl hover:text-red-500 hover:bg-white rounded-lg transition hover:scale-110 shadow-slate-300"
              >
                Rejected
              </Button>
              <Button className=" bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                Approve
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminCards
