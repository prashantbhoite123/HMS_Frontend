import { useMyPatientDetail } from "@/Api/patient/useMyPatientProfile"
import Loader from "@/components/Loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientType } from "@/Types/DashTypes"
import { format } from "date-fns"
import { useParams } from "react-router-dom"

const PatientDetailPage = () => {
  const { patientId } = useParams()
  const { patientDetail, isLoading } = useMyPatientDetail(patientId as string)
  const data: PatientType | any = patientDetail

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
          alt="Profile"
          className="w-32 h-32 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{data?.name}</h1>
          <p className="text-lg text-gray-500">
            {data?.gender}, {data?.age} years old
          </p>
          <p className="text-sm text-gray-400">
            DOB: {format(new Date(data?.dateOfBirth), "dd/MM/yyyy")}
          </p>
        </div>
      </div>

      <Tabs defaultValue="about" className="mt-6">
        <TabsList className="space-x-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="medical-info">Medical Info</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <div className="grid grid-cols-1 md:grid-cols-2  mt-4">
            <div className="flex flex-col gap-y-2">
              <h2 className="font-semibold text-xl text-black ">
                Contact Information
              </h2>
              <p>
                <span className="font-semibold text-blue-500">Phone:</span>
                <span className="px-2">{data?.phone}</span>
              </p>
              <p>
                <span className="font-semibold text-blue-500"> Address:</span>
                <span className="px-2">
                  {data?.address?.city}, {data?.address?.state},
                  {data?.address?.country}
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="font-semibold text-xl text-black ">
                Emergency Contact
              </h2>
              <p>
                <span className="font-semibold text-blue-500">Name:</span>{" "}
                <span className="px-2">{data?.emergencyContact?.name}</span>
              </p>
              <p>
                <span className="font-semibold text-blue-500">Relation:</span>{" "}
                <span className="px-2">{data?.emergencyContact?.relation}</span>
              </p>
              <p>
                <span className="font-semibold text-blue-500">Phone:</span>{" "}
                <span className="px-2"> {data?.emergencyContact?.phone}</span>
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="mt-4">
            <h2 className="font-semibold text-xl text-black">Visit History</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {data?.visitHistory.length > 0 ? (
                data?.visitHistory.map((visit: any, index: number) => (
                  <div key={index} className="border-t pt-2 mt-2">
                    <p>
                      <span className="font-semibold text-blue-500">
                        Last Visit:
                      </span>{" "}
                      {format(new Date(visit?.lastVisitDate), "dd/MM/yyyy")}
                    </p>
                    <p>
                      <span className="font-semibold text-blue-500">
                        Doctor:
                      </span>{" "}
                      {visit?.assignedDoctor}
                    </p>
                    <p>
                      <span className="font-semibold text-blue-500">
                        Reason:
                      </span>{" "}
                      {visit?.lastVisitReason}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No visit history available.</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medical-info">
          <h2 className="font-semibold text-xl mt-4">Medical History</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-y-2">
              <h3 className="font-medium text-lg">History</h3>
              <p>
                <span className="font-semibold text-blue-500">Allergies:</span>{" "}
                {data?.medicalHistory?.allergies}
              </p>
              <p>
                <span className="font-semibold text-blue-500">
                  Chronic Conditions:
                </span>{" "}
                {data?.medicalHistory?.chronicConditions}
              </p>
              <p>
                <span className="font-semibold text-blue-500">
                  Past Surgeries:
                </span>{" "}
                {data?.medicalHistory?.pastSurgeries}
              </p>
              <p>
                <span className="font-semibold text-blue-500">
                  Current Medications:
                </span>{" "}
                {data?.medicalHistory?.currentMedications}
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h3 className="font-medium text-lg">Current Info</h3>
              <p>
                <span className="font-semibold text-blue-500">
                  Reason for Visit:
                </span>{" "}
                {data?.currentMedicalInfo?.reasonForVisit}
              </p>
              <p>
                <span className="font-semibold text-blue-500">Symptoms:</span>{" "}
                {data?.currentMedicalInfo?.symptoms}
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h4 className="mt-2 font-medium text-lg">Vital Signs</h4>
              <p>
                <span className="font-semibold text-blue-500">
                  Blood Pressure:
                </span>
                {data?.currentMedicalInfo?.vitalSigns?.bloodPressure}
              </p>
              <p>
                <span className="font-semibold text-blue-500">Heart Rate:</span>{" "}
                {data?.currentMedicalInfo?.vitalSigns?.heartRate}
              </p>
              <p>
                <span className="font-semibold text-blue-500">Weight:</span>{" "}
                {data?.currentMedicalInfo?.vitalSigns?.weight} kg
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insurance">
          <div className=" flex flex-col gap-y-2">
            <h2 className="font-semibold text-lg">Insurance Information</h2>
            <p>
              <span className="font-semibold text-blue-500">Provider:</span>{" "}
              {data?.insurance?.provider}
            </p>
            <p>
              <span className="font-semibold text-blue-500">
                Policy Number:
              </span>{" "}
              {data?.insurance?.policyNumber}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PatientDetailPage
