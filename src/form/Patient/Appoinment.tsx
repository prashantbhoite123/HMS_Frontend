import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from "react-datepicker"
import { format } from "date-fns"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

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

export type Appointment = z.infer<typeof formData>

export interface IDoctors {
  doctorName: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
}

type Props = {
  doctors: IDoctors[]
  onSave: (data: Appointment) => void
  isLoading: boolean
}

// Generate time slots for a given doctor
export const generateTimeSlots = (doctor: IDoctors): string[] => {
  const slots: string[] = []
  const workingHours = Number(doctor.workingHours) // Convert to number
  const startHour = 9

  for (let i = 0; i < workingHours; i++) {
    const startTime = startHour + i
    const endTime = startTime + 1
    slots.push(`${startTime}:00 - ${endTime}:00`)
  }

  return slots
}

const Appointment = ({ doctors, onSave, isLoading }: Props) => {
  const [close, setClose] = useState(false)

  const handleClick = () => {
    setClose(false)
  }

  const form = useForm<Appointment>({
    resolver: zodResolver(formData),
    defaultValues: {
      appointmentDate: format(new Date(), "yyyy-MM-dd"),
    },
  })
  const { control, setValue, watch } = form

  const selectedDoctorName = watch("doctorName")
  const selectedDoctor = doctors.find(
    (doctor) => doctor.doctorName === selectedDoctorName
  )

  const appointmentSlots = selectedDoctor
    ? generateTimeSlots(selectedDoctor)
    : []
  const onSubmit = (data: Appointment) => {
    onSave(data)
    form.setValue("patientName", "")
    form.setValue("doctorName", "")
    form.setValue("appointmentDate", "")
    form.setValue("appTime", "")
    form.setValue("reason", "")
  }

  return (
    <Drawer open={close} onOpenChange={setClose}>
      <DrawerTrigger>
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full text-lg bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold rounded-lg py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Book Appointment
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen bg-slate-50">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col  items-center mt-7 mb-3 p-6 w-full md:w-[30vw] bg-white shadow-lg shadow-slate-700 rounded-xl">
                <h1 className="text-xl text-green-400 font-semibold">
                  Book Appointment
                </h1>
                <div className="flex flex-col w-full gap-3 mt-5">
                  <label
                    htmlFor="patientName"
                    className="text-sm font-semibold"
                  >
                    Patient Name
                  </label>
                  <input
                    {...form.register("patientName")}
                    className="border p-2 rounded"
                    placeholder="Enter patient name"
                  />

                  <label htmlFor="doctorName" className="text-sm font-semibold">
                    Doctor Name
                  </label>
                  <Controller
                    name="doctorName"
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="border p-2 rounded">
                        <option value="" disabled selected>
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

                  <label
                    htmlFor="appointmentDate"
                    className="text-sm font-semibold"
                  >
                    Appointment Date
                  </label>
                  <Controller
                    name="appointmentDate"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        selected={new Date(field.value)}
                        onChange={(date) =>
                          setValue(
                            "appointmentDate",
                            format(date as Date, "dd/MM/yyyy")
                          )
                        }
                        className="border p-2 rounded"
                        placeholderText="Select appointment date"
                        dateFormat="yyyy-MM-dd"
                      />
                    )}
                  />

                  <label htmlFor="appTime" className="text-sm font-semibold">
                    Appointment Time
                  </label>
                  <Controller
                    name="appTime"
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="border p-2 rounded">
                        <option value="" disabled selected>
                          Select appointment time
                        </option>
                        {appointmentSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  <label htmlFor="reason" className="text-sm font-semibold">
                    Reason
                  </label>
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        className="resize-none border p-2 rounded"
                        placeholder="Add reason"
                      />
                    )}
                  />

                  <Button
                    onClick={handleClick}
                    className="bg-gradient-to-r from-indigo-600 to-pink-600"
                  >
                    {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}

export default Appointment
