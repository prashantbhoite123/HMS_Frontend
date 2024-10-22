import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import FormInput from "../Common_Form/FormInput"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

const formData = z.object({
  patientName: z.string().trim().min(1, { message: "patientName is required" }),
  doctorName: z.string().trim().min(1, { message: "doctorName is required" }),
  appointmentDate: z
    .string()
    .trim()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "appointmentDate is must be formated",
    }),
  reason: z.string().trim().min(1, { message: "reason is required" }),
})

export type appoinment = z.infer<typeof formData>

const onSubmit = (data: appoinment) => {
  console.log(data)
}

export interface IDoctors extends Document {
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
  const form = useForm<appoinment>({
    resolver: zodResolver(formData),
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
              className="w-full bg-green-500 text-[1.1.4rem] shadow-sm text-white"
            >
              Book Appoinment
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-screen">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col items-center  p-6  w-[50vw] bg-slate-200">
                  <h1 className="text-lg text-green-400 font-semibold">
                    Book Appoinment
                  </h1>
                  <div className="flex flex-col w-full gap-5 mt-5 justify-center">
                    <FormInput
                      name="patientName"
                      type="text"
                      label="Patient Name"
                      placeholder="patientname"
                    />
                    <label
                      htmlFor="experienceLevel"
                      className="text-sm font-semibold"
                    >
                      Hospital Type
                    </label>
                    <Controller
                      name="doctorName"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="block w-full cursor-pointer appearance-none text-black bg-white border border-gray-300 rounded-md py-2 px-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-green-400 sm:text-sm"
                        >
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
                      name="patientName"
                      type="text"
                      label="Patient Name"
                      placeholder="patientname"
                    />
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
