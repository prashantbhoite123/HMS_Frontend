import { useMygetHospital } from "@/Api/Hospital/useMyHospitalDetails"

import { useParams } from "react-router-dom"

const DetailPage = () => {
  const { hospitalId } = useParams()
  const { getHospital, isLoading } = useMygetHospital(hospitalId as string)

  console.log("Fetched hospital details:", getHospital)
  console.log("Loading status:", isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!getHospital) {
    return <div>No hospital details available.</div>
  }

  return (
    <div>
      <h2>{getHospital.name}</h2>{" "}
      {/* Displaying hospital name, if applicable */}
      <h3>Departments:</h3>
      <ul>
        {getHospital.departments.map((dept: string, index: number) => (
          <li key={index}>{dept}</li>
        ))}
      </ul>
    </div>
  )
}

export default DetailPage
