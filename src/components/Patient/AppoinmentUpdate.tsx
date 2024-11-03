import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useMyHospitalDetail } from "@/Api/Hospital/useMyHospitalDetails"
import { IHospital } from "@/Types/hospital"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ReactDatePicker from "react-datepicker"
import { z } from "zod"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { FaEdit } from "react-icons/fa"
import { generateTimeSlots, IDoctors } from "@/form/Patient/Appoinment"
import { Textarea } from "../ui/textarea"
import FormInput from "@/form/Common_Form/FormInput"
import { useUpdateApp } from "@/Api/patient/useMyAppoinment"

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
  appTime: string
  reason: string
  status: "Pending" | "Completed" | "Cancelled"
}

type Props = {
  appoinment: Appointment
}

const AppoinmentUpdate = ({ appoinment }: Props) => {
  const { allHospitalData, isLoading } = useMyHospitalDetail()

  console.log(isLoading)
  const matchingHospital = allHospitalData?.find(
    (hospital: IHospital) => hospital._id === appoinment.hospitalId
  )

  const doctors = matchingHospital?.doctors || []

  const form = useForm<AppointmentForm>({
    resolver: zodResolver(formData),
    defaultValues: {
      appointmentDate: format(new Date(), "yyyy-MM-dd"),
    },
  })

  const { control, setValue, watch } = form

  const selectedDoctorName = watch("doctorName")
  const selectedDoctor = doctors.find(
    (doctor: IDoctors) => doctor.doctorName === selectedDoctorName
  )

  const appointmentSlots = selectedDoctor
    ? generateTimeSlots(selectedDoctor)
    : []

  // const formValues = watch()
  // console.log("this is form values", formValues)

  const { updatedApp, isLoading: updatedappLoading } = useUpdateApp(
    appoinment._id
  )

  const onSubmit = (data: AppointmentForm) => {
    updatedApp(data)
    console.log("this is updated form data", data)
  }

  return (
    <FormProvider {...form}>
      <Dialog>
        <DialogTrigger>
          <Button className="flex items-center bg-gradient-to-r from-blue-200 to-blue-300 hover:underline hover:from-blue-100 hover:to-purple-200 text-blue-700 font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 space-x-3">
            <FaEdit className="text-2xl" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center mt-7 p-10 h-[70vh] w-full bg-white shadow-lg shadow-slate-700 rounded-xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center items-center ">
              <div className="">
                <h1 className="text-xl text-center text-green-400 font-semibold mb-4">
                  Update Appointment
                </h1>
                <div className="grid grid-cols-2 gap-5 mt-5 w-full">
                  <div className="flex flex-col">
                    <FormInput
                      label="Patient Name"
                      name="patientName"
                      defaultValue={appoinment.patientName}
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="doctorName"
                      className="text-sm font-semibold mb-1"
                    >
                      Doctor Name
                    </label>
                    <Controller
                      name="doctorName"
                      control={control}
                      defaultValue={appoinment.doctorName}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="h-10 text-black rounded-md border border-gray-300 placeholder:text-slate-700 px-4 focus:outline-cyan-600"
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
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="appointmentDate"
                      className="text-sm font-semibold mb-1"
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
                          className="border p-2 rounded h-10"
                          placeholderText="Select appointment date"
                          dateFormat="yyyy-MM-dd"
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="appTime"
                      className="text-sm font-semibold mb-1"
                    >
                      Appointment Time
                    </label>
                    <Controller
                      name="appTime"
                      control={control}
                      defaultValue={appoinment.appTime}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="h-10 border p-2 rounded-md"
                        >
                          <option value="" disabled>
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
                  </div>

                  <div className="flex flex-col col-span-2">
                    <label
                      htmlFor="reason"
                      className="text-sm font-semibold mb-1"
                    >
                      Reason
                    </label>
                    <Controller
                      name="reason"
                      control={control}
                      defaultValue={appoinment.reason}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="resize-none border border-slate-400 p-2 rounded h-24"
                          placeholder="Add reason"
                        />
                      )}
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 col-span-2 mt-4 h-10">
                    {updatedappLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  )
}

export default AppoinmentUpdate