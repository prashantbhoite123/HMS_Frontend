// import { FaEdit } from "react-icons/fa"
// import { Button } from "../ui/button"
// import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
// import { FormProvider, useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { format } from "date-fns"
// import { z } from "zod"
// import { useMyHospitalDetail } from "@/Api/Hospital/useMyHospitalDetails"
// import { IHospital } from "@/Types/hospital"
// // import { Form } from "../ui/form"
// // import { FormProvider } from "react-hook-form"

// const formData = z.object({
//   patientName: z.string().min(1, { message: "Patient name is required" }),
//   doctorName: z.string().min(1, { message: "Doctor name is required" }),
//   appointmentDate: z
//     .string({
//       required_error: "Appointment date is required",
//       invalid_type_error: "Invalid date format",
//     })
//     .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
//   appTime: z.string().min(1, { message: "Appointment time is required" }),
//   reason: z.string().min(1, { message: "Reason is required" }),
// })

// export type AppointmentForm = z.infer<typeof formData>

// type Appointment = {
//   _id: string
//   patientName: string
//   doctorName: string
//   appointmentDate: Date
//   hospitalId: string
//   reason: string
//   status: "Pending" | "Completed" | "Cancelled"
// }
// type Props = {
//   appoinment: Appointment
// }

// const AppoinmentUpdate = ({ appoinment }: Props) => {
//   const { allHospitalData = [], isLoading } = useMyHospitalDetail()
//   console.log(isLoading)

//   // console.log("this is appoinment", appoinment)

//   const matchingHospital = allHospitalData?.find(
//     (hospital: IHospital) => hospital._id === appoinment.hospitalId
//   )

//   if (matchingHospital) {
//     console.log("Found matching hospital:", matchingHospital)
//   } else {
//     console.log("No matching hospital found")
//   }

//   const form = useForm<AppointmentForm>({
//     resolver: zodResolver(formData),
//     defaultValues: {
//       appointmentDate: format(new Date(), "yyyy-MM-dd"), // Format today's date to "yyyy-MM-dd"
//     },
//   })

//   // const onsubmit = (data: FormData) => {
//   //   console.log(data)
//   // }
//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger>
//           <Button className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 hover:underline hover:from-blue-100 hover:to-purple-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 space-x-3">
//             <FaEdit className="text-2xl" />
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <FormProvider {...form}>
//             <form></form>
//           </FormProvider>
//         </DialogContent>
//       </Dialog>
//       {/* <span>Edit</span> */}
//     </div>
//   )
// }

// export default AppoinmentUpdate

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../ui/dialog"

import { useMyHospitalDetail } from "@/Api/Hospital/useMyHospitalDetails"
import { IHospital } from "@/Types/hospital"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { FaEdit } from "react-icons/fa"
import { IDoctors } from "@/form/Patient/Appoinment"

const formData = z.object({
  patientName: z.string().min(1, { message: "Patient name is required" }),
  doctorName: z.string().min(1, { message: "Doctor name is required" }),
  appointmentDate: z
    .string({
      required_error: "Appointment date is required",
      invalid_type_error: "Invalid date format",
    })
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
  appTime: z.string().min(1, { message: "Appointment time is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
})

export type AppointmentForm = z.infer<typeof formData>

type Appointment = {
  _id: string
  patientName: string
  doctorName: string
  appointmentDate: Date
  hospitalId: string
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}

type Props = {
  appoinment: Appointment
}

const AppoinmentUpdate = ({ appoinment }: Props) => {
  const { allHospitalData, isLoading } = useMyHospitalDetail()
  console.log(isLoading)
  // Find the specific hospital matching the appointment's hospitalId
  const matchingHospital = allHospitalData?.find(
    (hospital: IHospital) => hospital._id === appoinment.hospitalId
  )

  console.log("this is match hospital", matchingHospital)

  // Access doctors of the matched hospital if available
  const doctors = matchingHospital?.doctors || [] // Assuming doctors are in `doctors` field

  const form = useForm<AppointmentForm>({
    resolver: zodResolver(formData),
    defaultValues: {
      appointmentDate: format(new Date(), "yyyy-MM-dd"),
    },
  })

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 hover:underline hover:from-blue-100 hover:to-purple-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 space-x-3">
            <FaEdit className="text-2xl" />
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby="appointment-description">
          <DialogTitle>Appointment Update</DialogTitle>
          <p id="appointment-description">
            Update details for the appointment with {appoinment.doctorName}.
          </p>

          <FormProvider {...form}>
            <form>
              {/* Form fields go here */}
              <label htmlFor="doctor">Select Doctor</label>
              <select id="doctor" {...form.register("doctorName")}>
                {doctors.map((doctor: IDoctors, index: number) => (
                  <option key={index} value={doctor.doctorName}>
                    {doctor.doctorName}
                  </option>
                ))}
              </select>
              {/* Other form fields... */}
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AppoinmentUpdate
