import { createSlice } from '@reduxjs/toolkit'

export type Screen = "home" | "register" | "login" | "browse"

export const screenSlice = createSlice({
  name: 'screen',
  initialState: {
    value: "home",
  },
  reducers: {
    goHome: (state) => {
      state.value = "home"
    },
    goRegister: (state) => {
      state.value = "register"
    },
    goLogin: (state) => {
      state.value = "login"
    },
    goBrowse: (state) => {
      state.value = "browse"
    },
  },
})

export const { goHome, goLogin, goRegister, goBrowse } = screenSlice.actions

export default screenSlice.reducer
