import { useParams } from "react-router-dom"

const CheckSearch = () => {
  const { city } = useParams()
  console.log("ths is =====", city)
  return (
    <>
      <div className="text-red-500">CheckSearch this is {city}</div>
    </>
  )
}

export default CheckSearch
