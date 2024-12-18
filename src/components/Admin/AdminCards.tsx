import { IHospital } from "@/Types/hospital"
import { Card, CardContent, CardHeader } from "../ui/card"
import { FaPhone } from "react-icons/fa"
import { Bed, Dot } from "lucide-react"
import { Button } from "../ui/button"
import { BsWatch } from "react-icons/bs"
import AdminResonPoup from "./AdminResonPoup"
import LoadingBtn from "../LoadingBtn"

type Props = {
  hospitals: IHospital
  rejectedHospital: (reson: string, hospitalId: string) => void
  isLoading: boolean
  hospitalId: string
}

const AdminCards = ({
  hospitals,
  rejectedHospital,
  isLoading,
  hospitalId,
}: Props) => {
  const handleRejection = (reson: string) => {
    rejectedHospital(reson, hospitalId as string)
  }

  const handleApprove = () => {
    rejectedHospital(import.meta.env.VITE_APPROVE, hospitalId as string)
  }
  return (
    <div className="p-4">
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-lg font-semibold text-green-600 flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
              <span>{hospitals.hospitalName}</span>
              <span className="text-gray-500 text-sm">
                {hospitals.hospitalType}
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-500">
              <FaPhone />
              <span>{hospitals.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Bed />
              <span>{hospitals.totalBeds} Beds</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <BsWatch />
              <span>{new Date(hospitals.createdAt).toLocaleDateString()}</span>
            </div>

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

        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src={
                typeof hospitals.picture === "string"
                  ? hospitals.picture
                  : hospitals.picture instanceof File
                  ? URL.createObjectURL(hospitals.picture)
                  : "default-image-url.jpg"
              }
              alt="Hospital"
              className="w-full object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <div className="p-4 shadow-md rounded-md">
              <h3 className="text-lg font-semibold text-center text-green-600">
                Services
              </h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {hospitals.services?.slice(0, 8).map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-800 text-sm font-semibold"
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
                    className="flex items-center gap-2 text-gray-800 text-sm font-semibold"
                  >
                    {dep.length - 1 && <Dot size={14} />}
                    {dep}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-2 space-y-4 md:space-y-0 space-x-4">
              <AdminResonPoup
                hospitalRejection={handleRejection}
                isLoading={isLoading}
              />

              {isLoading ? (
                <LoadingBtn />
              ) : (
                <Button
                  onClick={handleApprove}
                  className=" bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
                >
                  Approve
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminCards
