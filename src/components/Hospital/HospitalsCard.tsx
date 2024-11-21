
import { IHospital } from "@/Types/hospital"
import { Card, CardContent, CardHeader } from "../ui/card"
import { MdOutlineDone } from "react-icons/md"

type Props = {
  Hospitals: IHospital
  loading: boolean
}

const HospitalsCard = ({ Hospitals, loading }: Props) => {
  const imageSrc =
    Hospitals.picture instanceof File
      ? URL.createObjectURL(Hospitals.picture)
      : Hospitals.picture

  return (
    <>
      {loading ? (
        <h1 className="text-center text-lg font-bold text-gray-700">
          Loading...
        </h1>
      ) : (
        <div className="p-4 w-full max-w-4xl mx-auto">
          <Card className="shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <h1 className="text-lg font-semibold text-gray-800">
                  {Hospitals.hospitalName} -
                  <span className="text-green-500 px-2">
                    {Hospitals.hospitalType}
                  </span>
                </h1>
                <h1 className="text-lg font-semibold text-gray-700">
                  Total Beds:{" "}
                  <span className="text-gray-800">{Hospitals.totalBeds}</span>
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Section */}
                <img
                  className="h-[30vh] w-full rounded-md object-cover"
                  src={imageSrc}
                  alt={`${Hospitals.hospitalName} Image`}
                />

                {/* Details Section */}
                <div className="space-y-4">
                  {/* Services */}
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                      Services
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Hospitals?.services
                        ?.slice(0, 5)
                        .map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center text-green-500 font-semibold text-sm"
                          >
                            <MdOutlineDone className="mr-1" />
                            {service}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h1 className="text-lg font-semibold text-green-500">
                      Address:
                    </h1>
                    <div className="text-gray-700 space-y-1">
                      <p>{Hospitals.address.city}</p>
                      <p>{Hospitals.address.state}</p>
                      <p>{Hospitals.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default HospitalsCard
