import {
  usecreateHospital,
  useGetHospital,
  useUpdateMyHospital,
} from "@/Api/Hospital/useMyCreateHospital"
import HospitalCreateForm from "@/form/Hospital-Auth-form/HospitalCreateForm"

const HospitalCreate = () => {
  const { createHospitaldata } = usecreateHospital()
  const { hospital, isLoading, refetch } = useGetHospital()
  const { updateHospital, isLoading: updateLoading } =
    useUpdateMyHospital(refetch)

  const updatedHospital = !!updateHospital

  console.log(updatedHospital)
  return (
    <div className=" p-2">
      <HospitalCreateForm
        hospital={hospital}
        onSave={updatedHospital ? updateHospital : createHospitaldata}
        loading={isLoading || updateLoading}
      />
    </div>
  )
}

export default HospitalCreate
