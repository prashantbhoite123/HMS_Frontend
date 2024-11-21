// import { departments } from "@/config/HospitalData"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Check, ChevronDown, ChevronUp } from "lucide-react"
// import { ChangeEvent } from "react"
// import { Button } from "../ui/button"

// type Props = {
//   onChange: (department: string[]) => void
//   selectedDept: string[]
//   isExpanded?: boolean
//   onExpandedClick?: () => void
// }

// const SearchDetails = ({
//   onChange,
//   selectedDept,
//   isExpanded,
//   onExpandedClick,
// }: Props) => {
//   console.log(isExpanded, onExpandedClick)
//   const handleDeptChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const clickDept = event.target.value
//     const isChecked = event.target.checked // Corrected typo

//     const newDeptList = isChecked
//       ? [...selectedDept, clickDept]
//       : selectedDept.filter((dept) => dept !== clickDept)

//     onChange(newDeptList)
//   }

//   const handleDeptReset = () => onChange([])

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <div className="text-md font-semibold mb-2">Filter by department</div>
//         <div
//           onClick={handleDeptReset}
//           className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
//         >
//           Reset filters
//         </div>
//       </div>

//       <div className="flex flex-col space-y-2">
//         {departments
//           .slice(0, isExpanded ? departments.length : 7)
//           .map((dept) => {
//             const isSelected = selectedDept.includes(dept)

//             return (
//               <div className="flex" key={dept}>
//                 {" "}
//                 {/* Added key prop */}
//                 <Input
//                   id={`dept_${dept}`}
//                   type="checkbox"
//                   className="hidden"
//                   value={dept}
//                   checked={isSelected}
//                   onChange={handleDeptChange}
//                 />
//                 <Label
//                   htmlFor={`dept_${dept}`}
//                   className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
//                     isSelected
//                       ? "border border-green-600 text-green-600"
//                       : "border border-slate-300"
//                   }`}
//                 >
//                   {isSelected && <Check size={20} strokeWidth={3} />}
//                   {dept}
//                 </Label>
//               </div>
//             )
//           })}

//         <Button
//           onClick={onExpandedClick}
//           variant="link"
//           className="mt-4 flex-1"
//         >
//           {isExpanded ? (
//             <span className="flex flex-row items-center">
//               {" "}
//               View Less <ChevronUp />
//             </span>
//           ) : (
//             <span className="flex flex-row items-center">
//               {" "}
//               View More <ChevronDown />
//             </span>
//           )}
//         </Button>
//       </div>
//     </>
//   )
// }

// export default SearchDetails

import { departments } from "@/config/HospitalData"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "../ui/button"

type Props = {
  onChange: (department: string[]) => void
  selectedDept: string[]
  isExpanded?: boolean
  onExpandedClick?: () => void
}

const SearchDetails = ({
  onChange,
  selectedDept,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleDeptChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedDept = event.target.value
    const isChecked = event.target.checked

    const updatedDeptList = isChecked
      ? [...selectedDept, clickedDept]
      : selectedDept.filter((dept) => dept !== clickedDept)

    onChange(updatedDeptList)
  }

  const handleDeptReset = () => onChange([])

  return (
    <div className="p-4 bg-white rounded-md shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Filter by Department
        </h2>
        <button
          onClick={handleDeptReset}
          className="text-sm font-semibold text-blue-500 underline"
        >
          Reset Filters
        </button>
      </div>

      {/* Department List */}
      <div className="space-y-2">
        {departments
          .slice(0, isExpanded ? departments.length : 7)
          .map((dept) => {
            const isSelected = selectedDept.includes(dept)

            return (
              <div className="flex items-center" key={dept}>
                <Input
                  id={`dept_${dept}`}
                  type="checkbox"
                  className="hidden"
                  value={dept}
                  checked={isSelected}
                  onChange={handleDeptChange}
                />
                <Label
                  htmlFor={`dept_${dept}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-gray-300 text-gray-800"
                  }`}
                >
                  {isSelected && <Check size={16} strokeWidth={3} />}
                  {dept}
                </Label>
              </div>
            )
          })}
      </div>

      {/* Expand/Collapse Button */}
      <Button
        onClick={onExpandedClick}
        variant="ghost"
        className="w-full mt-4 flex items-center justify-center gap-2 text-gray-700"
      >
        {isExpanded ? (
          <>
            View Less <ChevronUp size={18} />
          </>
        ) : (
          <>
            View More <ChevronDown size={18} />
          </>
        )}
      </Button>
    </div>
  )
}

export default SearchDetails
