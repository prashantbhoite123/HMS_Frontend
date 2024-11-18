import { IHospital } from "@/Types/hospital"
import { Card, CardContent, CardHeader } from "../ui/card"
import { FaPhone } from "react-icons/fa"
import { Bed } from "lucide-react"

type Props = {
  hospitals: IHospital
}

const AdminCards = ({ hospitals }: Props) => {
  return (
    <div>
      <Card className="p-4 shadow-lg">
        <CardHeader>
          <div className="flex space-x-7">
            <div className="text-lg font-semibold text-green-500 flex flex-col md:flex-row items-start md:items-center gap-x-0 md:gap-x-3">
              <span>{hospitals.hospitalName}</span>
              <span className="text-black text-sm">
                {hospitals.hospitalType}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone />
              <span>{hospitals.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bed />
              <span>{hospitals.totalBeds}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bed />
              {/* <span>{hospitals.createdAt aa date}</span> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-[3fr_2fr_2fr_2fr]">
          <div className="">
            {" "}
            <div className="">
              <img
                src={hospitals.picture as File}
                alt="error"
                className="h-52"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span>{hospitals.address.city}</span>
            <span>{hospitals.address.country}</span>
            <span>{hospitals.address.state}</span>
          </div>
          <div className="">
            <span className="text-lg font-semibold text-center text-green-500">
              Services
            </span>
            {hospitals.services?.slice(0, 9).map((service, index) => (
              <div key={index} className="mt-2">
                {service}
              </div>
            ))}
          </div>
          <div className="">
            <span className="text-lg font-semibold text-center text-blue-500">
              Departments
            </span>
            {hospitals.departments?.slice(0, 9).map((service, index) => (
              <div key={index} className="mt-2">
                {service}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminCards
