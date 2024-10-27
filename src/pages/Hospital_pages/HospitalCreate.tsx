import {
  usecreateHospital,
  useGetHospital,
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

  const isEditing = !!hospital

  return (
    <div className=" p-2">
      <HospitalCreateForm
        hospital={hospital}
        onSave={isEditing ? updateHospital : createHospitaldata}
        loading={isLoading || updateLoading}
      />
    </div>
  )
}

export default HospitalCreate
