// import {
//   useMyHospitalDetail,
//   useMySearchHospital,
// } from "@/Api/Hospital/useMyHospitalDetails"
// import HospitalsCard from "@/components/Hospital/HospitalsCard"
// import PaginationSelector from "@/components/Hospital/PaginationSelector"
// import SearchBar, { SearchForm } from "@/components/Hospital/SearchBar"
// import SearchDetails from "@/components/Hospital/SearchDetails"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { Separator } from "@/components/ui/separator"
// import { IHospital } from "@/Types/hospital"
// import { useState } from "react"
// import { Link } from "react-router-dom"

// type SearchState = {
//   searchQuery: string
//   page: number
// }
// // const HospitalsPage = () => {
// //   const [searchState, setSearchState] = useState<SearchState>({
// //     searchQuery: "",
// //     page: 1,
// //   })
// //   const { allHospitalData, isLoading } = useMyHospitalDetail()
// //   const { result, isLoading: searchLoading } = useMySearchHospital(
// //     searchState.searchQuery
// //   )

// //   const setPage = (page: number) => {
// //     setSearchState((prev) => ({
// //       ...prev,
// //       page,
// //     }))
// //   }

// //   const handleSearchSubmit = (searchFormValues: SearchForm) => {
// //     setSearchState(searchFormValues)
// //   }

// //   // Determine which hospital data to display
// //   const displayHospitalData =
// //     result && result.data && result.data.length > 0
// //       ? result.data
// //       : allHospitalData

// //   console.log("this is a result ==", result)
// //   console.log(searchLoading)

// //   return (
// //     <>
// //       <div className="grid grid-cols md:grid-cols-[4fr_1fr] gap-4 p-5 items-center">
// //         <SearchBar
// //           searchQuery={searchState.searchQuery}
// //           onSubmit={handleSearchSubmit}
// //         />
// //         <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
// //           <DropdownMenu>
// //             <DropdownMenuTrigger>
// //               <span className="font-semibold">Sort by: Best match</span>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent className="p-4 shadow-md mt-2 outline-none focus:outline-none focus:ring-0 focus:border-transparent">
// //               <DropdownMenuItem>Sort by services</DropdownMenuItem>
// //               <Separator />
// //               <DropdownMenuItem>Hospital type</DropdownMenuItem>
// //               <Separator />
// //               <DropdownMenuItem>total beds</DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </div>

// //       <div className="grid grid-row md:grid-cols-[4fr_1fr] mt-4">
// //         <div className="block md:hidden bg-slate-100">
// //           {displayHospitalData?.map((hospital: IHospital, index: number) => (
// //             <div key={index}>
// //               <SearchDetails hospital={hospital} />
// //             </div>
// //           ))}
// //         </div>
// //         <Link to="/detail">
// //           <div className="space-y-7">
// //             {displayHospitalData?.map((hospital: IHospital, index: number) => (
// //               <HospitalsCard
// //                 key={index}
// //                 Hospitals={hospital}
// //                 loading={isLoading || searchLoading}
// //               />
// //             ))}
// //           </div>
// //         </Link>

// //         <div className="hidden md:block bg-slate-100">
// //           {displayHospitalData?.map((hospital: IHospital, index: number) => (
// //             <div key={index}>
// //               <SearchDetails hospital={hospital} />
// //             </div>
// //           ))}

// //           <PaginationSelector
// //             page={result?.pagination.page}
// //             pages={result?.pagination.pages}
// //             onPageChange={setPage}
// //           />
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// const HospitalsPage = () => {
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1, // default page is 1
//   })

//   const { allHospitalData, isLoading } = useMyHospitalDetail()
//   const { result, isLoading: searchLoading } = useMySearchHospital(
//     searchState.searchQuery
//   )

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }))
//   }

//   const handleSearchSubmit = (searchFormValues: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       ...searchFormValues,
//     }))
//   }

//   // Determine which hospital data to display
//   const displayHospitalData =
//     result && result.data && result.data.length > 0
//       ? result.data
//       : allHospitalData

//   return (
//     <>
//       <div className="grid grid-cols md:grid-cols-[4fr_1fr] gap-4 p-5 items-center">
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={handleSearchSubmit}
//         />
//         <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <span className="font-semibold">Sort by: Best match</span>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="p-4 shadow-md mt-2 outline-none focus:outline-none focus:ring-0 focus:border-transparent">
//               <DropdownMenuItem>Sort by services</DropdownMenuItem>
//               <Separator />
//               <DropdownMenuItem>Hospital type</DropdownMenuItem>
//               <Separator />
//               <DropdownMenuItem>total beds</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="grid grid-row md:grid-cols-[4fr_1fr] mt-4">
//         <div className="block md:hidden bg-slate-100">
//           {displayHospitalData?.map((hospital: IHospital, index: number) => (
//             <div key={index}>
//               <SearchDetails hospital={hospital} />
//             </div>
//           ))}
//         </div>
//         <Link to="/detail">
//           <div className="space-y-7">
//             {displayHospitalData?.map((hospital: IHospital, index: number) => (
//               <HospitalsCard
//                 key={index}
//                 Hospitals={hospital}
//                 loading={isLoading || searchLoading}
//               />
//             ))}
//           </div>
//         </Link>
//         <PaginationSelector
//           page={result?.pagination.page || 1}
//           pages={result?.pagination.pages || 1}
//           onPageChange={setPage}
//         />

//         <div className="hidden md:block bg-slate-100">
//           {displayHospitalData?.map((hospital: IHospital, index: number) => (
//             <div key={index}>
//               <SearchDetails hospital={hospital} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default HospitalsPage

// import {
//   useMyHospitalDetail,
//   useMySearchHospital,
// } from "@/Api/Hospital/useMyHospitalDetails"
// import HospitalsCard from "@/components/Hospital/HospitalsCard"
// import PaginationSelector from "@/components/Hospital/PaginationSelector"
// import SearchBar, { SearchForm } from "@/components/Hospital/SearchBar"
// import SearchDetails from "@/components/Hospital/SearchDetails"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { Separator } from "@/components/ui/separator"
// import { IHospital } from "@/Types/hospital"
// import { useState } from "react"
// import { Link } from "react-router-dom"

// type SearchState = {
//   searchQuery: string
//   page: number
//   department: string
//   sector: string
// }

// const HospitalsPage = () => {
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1, // default page is 1
//     department: "", // default to all departments
//     sector: "", // default to all sectors
//   })

//   const { allHospitalData, isLoading } = useMyHospitalDetail()
//   const { result, isLoading: searchLoading } = useMySearchHospital(
//     searchState.searchQuery
//   )

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }))
//   }

//   const handleSearchSubmit = (searchFormValues: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       ...searchFormValues,
//     }))
//   }

//   const handleDepartmentChange = (department: string) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       department,
//     }))
//   }

//   const handleSectorChange = (sector: string) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       sector,
//     }))
//   }

//   // Determine which hospital data to display
//   const displayHospitalData =
//     result && result.data && result.data.length > 0
//       ? result.data
//       : allHospitalData

//   return (
//     <>
//       <div className="grid grid-cols md:grid-cols-[4fr_1fr] gap-4 p-5 items-center">
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={handleSearchSubmit}
//         />
//         <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <span className="font-semibold">Sort by: Best match</span>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="p-4 shadow-md mt-2 outline-none focus:outline-none focus:ring-0 focus:border-transparent">
//               <DropdownMenuItem
//                 onSelect={() => handleDepartmentChange("cardiology")}
//               >
//                 Cardiology
//               </DropdownMenuItem>
//               <Separator />
//               <DropdownMenuItem
//                 onSelect={() => handleDepartmentChange("neurology")}
//               >
//                 Neurology
//               </DropdownMenuItem>
//               <Separator />
//               <DropdownMenuItem onSelect={() => handleSectorChange("public")}>
//                 Public Sector
//               </DropdownMenuItem>
//               <Separator />
//               <DropdownMenuItem onSelect={() => handleSectorChange("private")}>
//                 Private Sector
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="grid grid-row md:grid-cols-[4fr_1fr] mt-4">
//         <div className="block md:hidden bg-slate-100">
//           {displayHospitalData?.map((hospital: IHospital, index: number) => (
//             <div key={index}>
//               <SearchDetails hospital={hospital} />
//             </div>
//           ))}
//         </div>
//         <Link to="/detail">
//           <div className="space-y-7">
//             {displayHospitalData?.map((hospital: IHospital, index: number) => (
//               <HospitalsCard
//                 key={index}
//                 Hospitals={hospital}
//                 loading={isLoading || searchLoading}
//               />
//             ))}
//           </div>
//         </Link>
//         <PaginationSelector
//           page={result?.pagination.page || searchState.page}
//           pages={result?.pagination.pages || 1}
//           onPageChange={setPage}
//         />

//         <div className="hidden md:block bg-slate-100">
//           {displayHospitalData?.map((hospital: IHospital, index: number) => (
//             <div key={index}>
//               <SearchDetails hospital={hospital} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default HospitalsPage

import {
  useMyHospitalDetail,
  useMySearchHospital,
} from "@/Api/Hospital/useMyHospitalDetails"
import HospitalsCard from "@/components/Hospital/HospitalsCard"
import PaginationSelector from "@/components/Hospital/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/Hospital/SearchBar"
import SearchDetails from "@/components/Hospital/SearchDetails"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import { IHospital } from "@/Types/hospital"
import { useState } from "react"
import { Link } from "react-router-dom"

type SearchState = {
  searchQuery: string
  page: number
}

const HospitalsPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1, // default page is 1
  })

  const { allHospitalData, isLoading } = useMyHospitalDetail()
  const { result, isLoading: searchLoading } = useMySearchHospital(
    searchState.searchQuery
  )

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }))
  }

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      ...searchFormValues,
    }))
  }

  // Determine which hospital data to display
  const displayHospitalData =
    result && result.data && result.data.length > 0
      ? result.data
      : allHospitalData

  return (
    <div className="container mx-auto p-5">
      {/* Search and Sort Section */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 items-center mb-6">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearchSubmit}
        />
        <div className="flex justify-center items-center border p-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="font-semibold">Sort by: Best match</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 shadow-md mt-2">
              <DropdownMenuItem>Sort by services</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>Hospital type</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>Total beds</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
        {/* Left Side: Hospital Cards */}
        <div>
          {displayHospitalData?.map((hospital: IHospital, index: number) => (
            <Link to="/detail" key={index}>
              <HospitalsCard
                Hospitals={hospital}
                loading={isLoading || searchLoading}
              />
            </Link>
          ))}
        </div>

        {/* Right Side: Departments (Sector) */}
        <div className="bg-slate-100 p-4 rounded">
          {displayHospitalData?.map((hospital: IHospital, index: number) => (
            <div key={index}>
              <SearchDetails hospital={hospital} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Pagination */}
      <div className="flex justify-center mt-8">
        <PaginationSelector
          page={result?.pagination.page || 1}
          pages={result?.pagination.pages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default HospitalsPage
