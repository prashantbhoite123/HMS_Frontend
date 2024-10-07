import mongoose from "mongoose"


export type IHospital = {
  hospitalName: string
  description?: string
  phoneNumber: string
  address: {
    city: string
    state: string
    country: string
  }[]

  hospitalType: string
  establishedDate?: Date
  totalBeds: number
  departments?: string[]
  services?: string[]
  doctors: {
    doctorName: string
    education: string
    experienceYears: number
    specialization: string
    workingHours: string
  }[]
  picture: string
  owner: mongoose.Types.ObjectId
  // New Fields
}
