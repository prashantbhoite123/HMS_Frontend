import { ObjectId } from "mongoose"

// Type for Address
type Address = {
  city: string
  country: string
  state: string
}

export type Hospital = {
  _id: string
  hospitalName: string
  description: string
  picture: string
  phoneNumber: string
  hospitalType: string
  establishedDate: string
  status: string
  totalBeds: number
  departments: string[]
  services: string[]
  owner: string
  createdAt: string
  updatedAt: string
  __v: number
  address: Address
}

type ProfileData = {
  _id: string
  username: string
  email: string
  password: string
  role: string
  admin: {
    isAdmin: boolean
    key: number
    logedin: boolean
    _id: string
    Akey: number
  }
  profilepic: string
  createdAt: string
  updatedAt: string
  __v: number
}

type lastMonthData = {
  approvedHospital: number
  pendingHospital: number
  patients: number
  users: number
}

export type DashCard = {
  totalApprovedHospital: number
  totalPatient: number
  lastMonthData: lastMonthData
  totalPendingHospital: number
  totalUsers: number
}

export type ResponseType = {
  dashCard: DashCard
  latestPendingHospitals: Hospital[]
  todaysPendingHospitals: Hospital[]
  chartData: { count: number; month: string | null }[]
  PendingHospital: Hospital[]
  ApprovedHospital: Hospital[]
  ProfileData: ProfileData
}

interface Doctor {
  _id: ObjectId
  doctorName: string
  email: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
}

interface Appointment {
  _id: ObjectId
  patientName: string
  petientId: ObjectId
  hospitalId: ObjectId
  doctorName: string
  appointmentDate: string
  appTime: string
  reason: string
  apptNumber: string
  status: string
  __v: number
  createdAt: string
}

// Define the structure of the data
export type DashboardResponse = {
  CardData: {
    completeAppoinments: number
    cancelAppoinments: number
    pendingAppoinments: number
    lastMonthAppoinment: number
    totalDoctors: number
  }
  latesAppoinments: Appointment[]
  chartData: { count: number; month: string | null }[]
  todayAppointments: Appointment[]
  doctors: Doctor[]
  allAppoinment: Appointment[]
  ProfileData: ProfileData
}
