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
        <h1>Loading</h1>
      ) : (
        <div className="p-2 w-full md:w-[60vw]">
          <Card className="shadow-lg shadow-gray-400">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:space-x-10 space-x-0 gap-3">
                <h1 className="text-lg font-semibold">
                  {Hospitals.hospitalName} -
                  <span className="text-green-500 px-2">
                    {Hospitals.hospitalType}
                  </span>
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <div className=" grid grid-row-[3fr_2fr_1fr] gap-3 md:gap-0  md:grid-cols-[3fr_2fr_1fr]">
                <img
                  className="h-[30vh] w-full md:w-[20vw] md:h-[30vh] rounded-md  object-cover"
                  src={imageSrc}
                />

                <div className="">
                  <h1 className="p-2 ml-2 text-lg font-semibold text-black">
                    Services
                  </h1>
                  {Hospitals?.services?.slice(0, 5).map((services) => (
                    <div className="flex text-green-500 font-semibold text-sm">
                      <MdOutlineDone className="mr-2" /> {services}
                    </div>
                  ))}
                  <div className="flex flex-col md:flex-row gap-x-3 mt-5  text-black font-semibold">
                    <h1 className="text-lg font-semibold text-green-500">
                      Address:-
                    </h1>
                    <h1>{Hospitals.address.city}</h1>
                    <h1>{Hospitals.address.country}</h1>
                    <h1>{Hospitals.address.state}</h1>
                  </div>
                </div>
                {/* <Separator /> */}
                <div className="">
                  <h1 className="text-lg font-semibold">
                    Total Beds:{Hospitals.totalBeds}
                  </h1>
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
