import { createSlice } from '@reduxjs/toolkit'
import { types } from '../../types/types'

const initialState = {
  isLoggedIn: false,
  uid: null,
  displayName: null
  // img: null,
  // email: null,
}

export const authSlice = createSlice({
  name: types.login,
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.uid = action.payload.uid
      state.displayName = action.payload.displayName
    },
    logout: () => {
      return initialState
    }
  }
})

export const { login, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth

export default authSlice.reducer
