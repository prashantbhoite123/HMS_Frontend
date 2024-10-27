import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from "react-datepicker"
import { format } from "date-fns"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const formData = z.object({
  patientName: z.string().min(1, { message: "Patient name is required" }),
  doctorName: z.string().min(1, { message: "Doctor name is required" }),
  appointmentDate: z
    .string({
      required_error: "Appointment date is required",
      invalid_type_error: "Invalid date format",
    })
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
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

const Appointment = ({ doctors, onSave, isLoading }: Props) => {
  const onSubmit = (data: Appointment) => {
    onSave(data)
  }

  const form = useForm<Appointment>({
    resolver: zodResolver(formData),
    defaultValues: {
      appointmentDate: format(new Date(), "yyyy-MM-dd"), // Format today's date to "yyyy-MM-dd"
    },
  })
  const { control, setValue } = form

  return (
    <Drawer>
      <DrawerTrigger>
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-green-500 text-[1.1rem] text-white"
          >
            Book Appointment
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen bg-slate-50">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col items-center mt-7 p-6 w-full md:w-[30vw] bg-white shadow-lg shadow-slate-700 rounded-xl">
                <h1 className="text-xl text-green-400 font-semibold">
                  Book Appointment
                </h1>
                <div className="flex flex-col w-full gap-5 mt-5">
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
                        {doctors.length === 1 && (
                          <option value="" disabled selected>
                            Select a doctor
                          </option>
                        )}
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
                            format(date as Date, "yyyy-MM-dd")
                          )
                        }
                        className="border p-2 rounded"
                        placeholderText="Select appointment date"
                        dateFormat="yyyy-MM-dd"
                      />
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

                  <Button className=" bg-gradient-to-r from-indigo-600 to-pink-600">
                    {isLoading ? <span>Loading..</span> : <span>Submit</span>}
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
