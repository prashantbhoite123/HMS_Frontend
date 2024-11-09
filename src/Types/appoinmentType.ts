export type IAppointment = {
  _id: string
  patientName: string
  hospitalId: string
  petientId: string
  doctorName: string
  appointmentDate: Date
  reason: string
  status: string
}

export type AppoinmentSearchResponse = {
  data: IAppointment[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}
