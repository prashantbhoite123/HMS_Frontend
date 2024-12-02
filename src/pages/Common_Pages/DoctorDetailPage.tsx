import Loader from "@/components/Loader"
import { useParams } from "react-router-dom"
import { useMyDoctorDetail } from "@/Api/Hospital/useMyDoctor"
import { Doctor } from "@/Types/DashTypes"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import HosImageDialog from "@/components/Hospital/HosImageDialog"
import { useUser } from "@/context/userContext"

const DoctorDetailPage = () => {
  const { currentUser } = useUser()
  console.log(currentUser)
  const { doctorId } = useParams()
  const { doctorDetail, isLoading } = useMyDoctorDetail(doctorId as string)
  const data: Doctor | any = doctorDetail

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-start md:items-center flex-col md:flex-row space-x-6">
        <Dialog>
          <DialogTrigger>
            <img
              draggable={false}
              className={`rounded-full select-none ml-4 md:ml-0 object-cover ${
                currentUser?.role === "hospital"
                  ? "w-28 h-28"
                  : "w-[25vw] h-[25vw] md:w-[15vw] md:h-[15vw]"
              }`}
              src={data?.profilepic || "https://via.placeholder.com/150"}
              alt={data?.doctorName || "Doctor Profile Picture"}
            />
          </DialogTrigger>
          <HosImageDialog picture={data?.profilepic} />
        </Dialog>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{data?.doctorName}</h1>

          <span>
            {data?.gender}, {`${data?.age} year old`}
          </span>
          <p className="text-sm text-gray-500">
            <p>
              <strong className="text-blue-500">Email:</strong> {data?.email}
            </p>
            <p>
              <strong className="text-blue-500">Phone:</strong> {data?.phone}
            </p>
            <p>
              <strong className="text-blue-500">Date of Birth:</strong>{" "}
              {new Date(data?.dateOfBirth).toLocaleDateString() || "N/A"}
            </p>
            <div>
              <strong className="text-blue-500">Address:</strong>
              <span>
                {" "}
                {`${data?.address?.city},${data?.address?.state},${data?.address?.country}`}
              </span>{" "}
            </div>
          </p>
        </div>
      </div>

      {/* Doctor Details Section */}
      <div className="mt-6 space-y-4">
        <div>
          <h2 className="font-semibold text-xl">Professional Information</h2>
          <p>
            <strong className="text-blue-500">Specialization:</strong>{" "}
            {data?.specialization}
          </p>
          <p>
            <strong className="text-blue-500">Experience:</strong>{" "}
            {data?.experienceYears} years
          </p>
          <p>
            <strong className="text-blue-500">Working Hours:</strong>{" "}
            {data?.workingHours} hours/day
          </p>
          <p>
            <strong className="text-blue-500">Education:</strong>{" "}
            {data?.education}
          </p>
          <p>
            <strong className="text-blue-500">Degree:</strong>{" "}
            <a
              href={data?.degree}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 underline"
            >
              View Degree
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailPage
