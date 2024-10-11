import { useMyHospitalDetail } from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
import { IHospital } from "@/Types/hospital"

const HospitalsPage = () => {
  const { allHospitalData, isLoading } = useMyHospitalDetail()
  return (
    <>
      <div className="">
        <div className="p-5">
          <h1>Searchbar</h1>
        </div>
        <div className="">
          {allHospitalData?.map((hospitals: IHospital, index: number) => (
            <HospitalsCard
              key={index}
              Hospitals={hospitals}
              loading={isLoading}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default HospitalsPage
