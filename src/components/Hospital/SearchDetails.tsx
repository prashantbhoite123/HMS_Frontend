import { IHospital } from "@/Types/hospital"
import { Input } from "../ui/input"

type Props = {
  hospital: IHospital
}

const SearchDetails = ({ hospital }: Props) => {
  return (
    <div className=" mb-5 md:mb-0">
      {hospital.departments?.map((dept) => (
        <div className="mt-4">
          <Input defaultValue={dept} />
        </div>
      ))}
    </div>
  )
}

export default SearchDetails
