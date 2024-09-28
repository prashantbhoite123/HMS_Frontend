import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  currnetHospital: null,
  error: null,
  loading: false,
}

const hospitalSlice = createSlice({
  name: "Hospital",
  initialState,
  reducers: {
    SignInstart: (state) => {
      ;(state.error = null), (state.loading = true)
    },
  },
})

export const { SignInstart } = hospitalSlice.actions

export default hospitalSlice.reducer
