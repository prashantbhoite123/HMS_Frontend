import { useMyRequestedHospital } from "@/Api/Admin/useMyAdminRequest"
import AdminCards from "@/components/Admin/AdminCards"
import Loader from "@/components/Loader"
import { IHospital } from "@/Types/hospital"

const AdminRequestHosPage = () => {
  const { requestedHospital, isLoading } = useMyRequestedHospital()
  console.log(requestedHospital)
  if (isLoading) {
    return (
      <div className="w-full h-full justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
          Hospital Approval Request
        </h1>
      </div>
      <div className="mt-5">
        {requestedHospital.length < 0 ? (
          <div>Requested hospitals not found</div>
        ) : (
          requestedHospital.map((hospital: IHospital, index: number) => (
            <div key={index} className=" mt-5">
              <AdminCards hospitals={hospital} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminRequestHosPage
