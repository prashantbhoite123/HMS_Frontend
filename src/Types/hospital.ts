import mongoose, { ObjectId } from "mongoose"

export type IHospital = {
  _id: string
  hospitalName: string
  description?: string
  phoneNumber: string
  address: {
    city: string
    state: string
    country: string
  }

  hospitalType: string
  establishedDate?: Date
  totalBeds: number
  departments?: string[]
  services?: string[]
  status: string
  picture: string | File | null
  owner: mongoose.Types.ObjectId
  createdAt: Date
}

export type HospitalSearchResponse = {
  data: IHospital[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type IDoctor = {
  _id: ObjectId
  doctorName: string
  profilePic: string
  degree: string
  role: "Doctor"
  email: string
  ownerId: ObjectId
  hospitalId: ObjectId
  password: string
  education: string
  experienceYears: number
  specialization: string
  workingHours: string
  __v: number
}
