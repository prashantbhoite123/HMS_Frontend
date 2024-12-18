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
}

export interface Doctor {
  role: string
  _id: string
  doctorName: string
  profilepic: string
  degree: string
  email: string
  ownerId: string
  hospitalId: string
  password: string
  education: string
  experienceYears: string
  specialization: string
  workingHours: string
  gender: string
  address: {
    city: string
    state: string
    country: string
  }
  age: number
  phone: string
  dateOfBirth: string
  __v: number
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
    totalAppoinments: number
    totalDoctors: number
    totalPatient: number
    lastMonthAppointments: number
    lastMonthPatients: number
    lastMonthDoctors: number
  }
  latesAppoinments: Appointment[]
  chartData: { count: number; month: string | null }[]
  todayAppointments: Appointment[]
  doctors: Doctor[]
  allAppoinment: Appointment[]
}

// Type for an individual appointment
export interface AppointmentType {
  _id: string
  patientName: string
  petientId: string
  hospitalId: string
  doctorName: string
  appointmentDate: Date
  appTime: string
  reason: string
  apptNumber: string
  status: "Pending" | "Completed" | "Cancelled" // Appointment status
  createdAt: Date
}

// Type for visit history in patient schema
export interface VisitHistoryType {
  _id: string
  lastVisitDate: Date
  assignedDoctor: string
  lastVisitReason: string
}

// Type for a patient
export interface PatientType {
  _id: string
  name: string
  dateOfBirth: Date
  gender: string
  age: number
  phone: string
  address: {
    city: string
    state: string
    country: string
  }
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  medicalHistory: {
    allergies: string
    chronicConditions: string
    pastSurgeries: string
    currentMedications: string
  }
  currentMedicalInfo: {
    reasonForVisit: string
    symptoms: string
    vitalSigns: {
      bloodPressure?: string
      heartRate?: number
      temperature?: number
      weight?: number
    }
  }
  userId: string
  visitHistory: VisitHistoryType[]
  insurance?: {
    provider?: string
    policyNumber?: string
  }
}

// Type for a doctor

// Type for appointment stats
export interface AppointmentStats {
  pending: number
  cancelled: number
  completed: number
}

// Main dashboard data type

export type dashDataType = {
  pendingAppointments: number
  cancelledAppointments: number
  completedAppointments: number
  lastMonth: AppointmentStats
}
export interface DoctorDashboardData {
  dashData: dashDataType
  latestAppointments: AppointmentType[]
  todayAppointments: AppointmentType[]
  allAppointments: AppointmentType[]
  allPatients: PatientType[]
  chartData: { count: number; month: string | null }[]
}
