import {
  usecreateHospital,
  useGetHospital,
} from "@/Api/Hospital/useMyCreateHospital"
import HospitalCreateForm from "@/form/Hospital-Auth-form/HospitalCreateForm"

const HospitalCreate = () => {
  const { createHospitaldata } = usecreateHospital()
  const { hospital, isLoading } = useGetHospital()
  return (
    <div className=" p-2">
      <HospitalCreateForm
        hospital={hospital}
        onSave={createHospitaldata}
        loading={isLoading}
      />
    </div>
  )
}

export default HospitalCreate
