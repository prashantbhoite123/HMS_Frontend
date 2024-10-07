import { usecreateHospital } from "@/Api/Hospital/useMyCreateHospital"
import HospitalCreateForm from "@/form/Hospital-Auth-form/HospitalCreateForm"

const HospitalCreate = () => {
  const { createHospitaldata, isLoading } = usecreateHospital()
  return (
    <div className=" p-2">
      <HospitalCreateForm onSave={createHospitaldata} loading={isLoading} />
    </div>
  )
}

export default HospitalCreate
