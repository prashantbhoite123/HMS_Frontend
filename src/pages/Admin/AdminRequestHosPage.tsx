import {
  useMyRejectHospital,
  useMyRequestedHospital,
} from "@/Api/Admin/useMyAdminRequest"
import AdminCards from "@/components/Admin/AdminCards"
import Loader from "@/components/Loader"
import { IHospital } from "@/Types/hospital"
import { useEffect } from "react"

const AdminRequestHosPage = () => {
  const { rejectionHos, isLoading: rejectedLoading } = useMyRejectHospital()
  const { requestedHospital, isLoading, refetch } = useMyRequestedHospital()
  console.log(requestedHospital)

  const handleRejectHos = (reson: string, hospitalId: string) => {
    rejectionHos({ reson, hospitalId })
  }
  useEffect(() => {
    if (!rejectedLoading && requestedHospital?.length) {
      refetch()
    }
  }, [rejectedLoading, requestedHospital, refetch])

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
        {requestedHospital.length === 0 ? (
          <div className="text-center mt-10 font-semibold text-3xl text-red-600">
            Requested hospitals not found
          </div>
        ) : (
          requestedHospital.map((hospital: IHospital, index: number) => (
            <div key={index} className=" mt-5">
              <AdminCards
                hospitals={hospital}
                rejectedHospital={handleRejectHos}
                isLoading={rejectedLoading}
                hospitalId={hospital._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminRequestHosPage
