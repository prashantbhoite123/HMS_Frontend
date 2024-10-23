// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, FormProvider, useForm } from "react-hook-form"
// import { z } from "zod"
// import FormInput from "../Common_Form/FormInput"
// import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
// import { Button } from "@/components/ui/button"
// import {
//   FormControl,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Textarea } from "@/components/ui/textarea"

// const formData = z.object({
//   patientName: z.string().trim().min(1, { message: "patientName is required" }),
//   doctorName: z.string().trim().min(1, { message: "doctorName is required" }),
//   appointmentDate: z.date({
//     required_error: "Appointment date is required",
//     invalid_type_error: "Invalid date format",
//   }),
//   reason: z.string().trim().min(1, { message: "reason is required" }),
// })

// export type appoinment = z.infer<typeof formData>

// const onSubmit = (data: appoinment) => {
//   console.log(data)
// }

// export interface IDoctors extends Document {
//   doctorName: string
//   education: string
//   experienceYears: number
//   specialization: string
//   workingHours: string
// }

// type Props = {
//   doctors: IDoctors[]
// }
// const Appoinment = ({ doctors }: Props) => {
//   const form = useForm<appoinment>({
//     resolver: zodResolver(formData),
//   })
//   const { control } = form
//   return (
//     <>
//       <Drawer>
//         <DrawerTrigger>
//           <div className="">
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full bg-green-500 text-[1.1.4rem] shadow-sm text-white"
//             >
//               Book Appoinment
//             </Button>
//           </div>
//         </DrawerTrigger>
//         <DrawerContent className="h-screen">
//           <FormProvider {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <div className="w-full h-full flex justify-center items-center">
//                 <div className="flex flex-col items-center mt-7 p-6 w-full md:w-[40vw] bg-white shadow-2xl">
//                   <h1 className="text-lg text-green-400 font-semibold">
//                     Book Appoinment
//                   </h1>
//                   <div className="flex flex-col w-full gap-5 mt-5 justify-center">
//                     <FormInput
//                       name="patientName"
//                       type="text"
//                       label="Patient Name"
//                       placeholder="patientname"
//                     />
//                     <label
//                       htmlFor="doctorName"
//                       className="text-sm font-semibold"
//                     >
//                       Doctor Name
//                     </label>
//                     <Controller
//                       name="doctorName"
//                       control={control}
//                       render={({ field }) => (
//                         <select
//                           {...field}
//                           className="block w-full cursor-pointer appearance-none text-black bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-green-400 sm:text-sm"
//                         >
//                           {doctors.map((doctor: IDoctors) => (
//                             <option
//                               key={doctor.doctorName}
//                               value={doctor.doctorName}
//                             >
//                               {doctor.doctorName}
//                             </option>
//                           ))}
//                         </select>
//                       )}
//                     />
//                     <FormInput
//                       name="appointmentDate"
//                       type="date"
//                       label="AppointmentDate"
//                       placeholder="appointmentDate"
//                     />
//                     <div className="w-full ">
//                       <Controller
//                         name="reason"
//                         rules={{ required: "Description is required" }}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Reason</FormLabel>
//                             <FormControl>
//                               <Textarea
//                                 {...field}
//                                 className="resize-none  border border-gray-300 rounded-[5px] text-black focus:outline-cyan-600"
//                                 autoFocus
//                                 placeholder="Add reason"
//                               />
//                             </FormControl>

//                             <FormMessage className="text-red-600"></FormMessage>
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <Button className="bg-green-400 text-lg ">Submit</Button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </FormProvider>
//         </DrawerContent>
//       </Drawer>
//     </>
//   )
// }

// export default Appoinment

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import FormInput from "../Common_Form/FormInput"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const formData = z.object({
  patientName: z
    .string()
    .trim()
    .min(1, { message: "Patient name is required" }),
  doctorName: z.string().trim().min(1, { message: "Doctor name is required" }),
  appointmentDate: z.date({
    required_error: "Appointment date is required",
    invalid_type_error: "Invalid date format",
  }),
  reason: z.string().trim().min(1, { message: "Reason is required" }),
})

export type Appointment = z.infer<typeof formData>

const onSubmit = (data: Appointment) => {
  console.log(data)
}

export interface IDoctors {
  doctorName: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
}

type Props = {
  doctors: IDoctors[]
}

const Appoinment = ({ doctors }: Props) => {
  const form = useForm<Appointment>({
    resolver: zodResolver(formData),
    defaultValues: {
      appointmentDate: new Date(), // Default today's date
    },
  })
  const { control } = form

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div className="">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-green-500 text-[1.1rem] shadow-sm text-white"
            >
              Book Appointment
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-screen">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col items-center mt-7 p-6 w-full md:w-[40vw] bg-white shadow-2xl">
                  <h1 className="text-lg text-green-400 font-semibold">
                    Book Appointment
                  </h1>
                  <div className="flex flex-col w-full gap-5 mt-5 justify-center">
                    <FormInput
                      name="patientName"
                      type="text"
                      label="Patient Name"
                      placeholder="Enter patient name"
                    />

                    <label
                      htmlFor="doctorName"
                      className="text-sm font-semibold"
                    >
                      Doctor Name
                    </label>
                    <Controller
                      name="doctorName"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="block w-full cursor-pointer appearance-none text-black bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-green-400 sm:text-sm"
                        >
                          <option value="" disabled>
                            Select a doctor
                          </option>
                          {doctors.map((doctor: IDoctors) => (
                            <option
                              key={doctor.doctorName}
                              value={doctor.doctorName}
                            >
                              {doctor.doctorName}
                            </option>
                          ))}
                        </select>
                      )}
                    />

                    <FormInput
                      name="appointmentDate"
                      type="date"
                      label="Appointment Date"
                      defaultValue={new Date().toISOString().split("T")[0]} // Sets today's date in "YYYY-MM-DD"
                      placeholder="" // Can be removed, not visible in most browsers for date input
                    />

                    <div className="w-full ">
                      <Controller
                        name="reason"
                        rules={{ required: "Reason is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="resize-none border border-gray-300 rounded-[5px] text-black focus:outline-cyan-600"
                                placeholder="Add reason"
                              />
                            </FormControl>
                            <FormMessage className="text-red-600"></FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button className="bg-green-400 text-lg">Submit</Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Appoinment
