import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loader from "@/components/Loader"
import { useParams } from "react-router-dom"

import { format } from "date-fns"
import { useMyDoctorDetail } from "@/Api/Hospital/useMyDoctor"

const DoctorDetailPage = () => {
  const { doctorId } = useParams()
  const { doctorDetail, isLoading } = useMyDoctorDetail(doctorId as string)
  const data: any = doctorDetail

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex items-center space-x-6">
        <img
          src={data?.profilepic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-xl font-semibold">{data?.doctorName}</h1>
          <p className="text-sm text-gray-500">
            Specialization: {data?.specialization}
          </p>
          <p className="text-sm text-gray-500">
            Role: {data?.role || "Doctor"}
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="space-x-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="work-history">Work History</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Personal Info */}
            <div>
              <h2 className="font-semibold text-lg">Personal Information</h2>
              <p>
                <strong>Email:</strong> {data?.email}
              </p>
              <p>
                <strong>Degree:</strong> {data?.degree}
              </p>
              <p>
                <strong>Education:</strong> {data?.education}
              </p>
            </div>

            {/* Professional Info */}
            <div>
              <h2 className="font-semibold text-lg">
                Professional Information
              </h2>
              <p>
                <strong>Specialization:</strong> {data?.specialization}
              </p>
              <p>
                <strong>Experience:</strong> {data?.experienceYears} years
              </p>
              <p>
                <strong>Working Hours:</strong> {data?.workingHours}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Work History Tab */}
        <TabsContent value="work-history">
          <h2 className="font-semibold text-lg">Work History</h2>
          {data?.workHistory?.length > 0 ? (
            data?.workHistory.map((work: any, index: number) => (
              <div key={index} className="border-t pt-2 mt-2">
                <p>
                  <strong>Hospital:</strong> {work?.hospitalName}
                </p>
                <p>
                  <strong>Position:</strong> {work?.position}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {work?.startDate
                    ? `${format(new Date(work?.startDate), "dd/MM/yyyy")} - ${
                        work?.endDate
                          ? format(new Date(work?.endDate), "dd/MM/yyyy")
                          : "Present"
                      }`
                    : "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>No work history available.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DoctorDetailPage
