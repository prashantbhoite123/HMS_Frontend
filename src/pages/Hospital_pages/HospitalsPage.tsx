import { useMyHospitalDetail } from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
import { IHospital } from "@/Types/hospital"

const HospitalsPage = () => {
  const { allHospitalData, isLoading } = useMyHospitalDetail()
  return (
    <>
      <div className="grid grid-col-[4fr_1fr] gap-4">
        <div className="p-5">
          <h1>Searchbar</h1>
        </div>

        <div className="space-y-4">
          {allHospitalData?.map((hospitals: IHospital, index: number) => (
            <HospitalsCard
              key={index}
              Hospitals={hospitals}
              loading={isLoading}
            />
          ))}
        </div>
        <div className="">
          <h1>Sorting section</h1>
        </div>
      </div>
    </>
  )
}

export default HospitalsPage
