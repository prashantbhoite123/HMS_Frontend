import mongoose from "mongoose"

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

  picture: File
  owner: mongoose.Types.ObjectId
  // New Fields
}

export type HospitalSearchResponse = {
  data: IHospital[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}


  export type doctors= {
    doctorName: string
    education: string
    experienceYears: number
    specialization: string
    workingHours: string
  }
  ;[]