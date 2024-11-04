import {
  usecreateHospital,
  useGetHospital,
  useMyDeleteHospital,
  useUpdateMyHospital,
} from "@/Api/Hospital/useMyCreateHospital"
import { useUser } from "@/context/userContext"
import HospitalCreateForm from "@/form/Hospital-Auth-form/HospitalCreateForm"

const HospitalCreate = () => {
  const { currentUser } = useUser()

  const { createHospitaldata } = usecreateHospital(currentUser?._id as string)
  const { hospital, isLoading, refetch } = useGetHospital()
  const { updateHospital, isLoading: updateLoading } =
    useUpdateMyHospital(refetch)
  const { deleteHos, isLoading:delLoading } = useMyDeleteHospital()

  const isEditing = !!hospital

  return (
    <div className=" p-2">
      <HospitalCreateForm
        deleteHospital={deleteHos}
        deleteLoding={delLoading}
        hospital={hospital}
        onSave={isEditing ? updateHospital : createHospitaldata}
        loading={isLoading || updateLoading}
      />
    </div>
  )
}

export default HospitalCreate
