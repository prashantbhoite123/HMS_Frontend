import DoctorsForm from "@/form/Hospital-Auth-form/Doctors/DoctorsForm"

type Props = {
  hospitalId: string
}

const DoctorSIgnup = ({ hospitalId }: Props) => {
  return (
    <div>
      <DoctorsForm hospitalId={hospitalId} />
    </div>
  )
}

export default DoctorSIgnup
