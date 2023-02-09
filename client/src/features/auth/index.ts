import { createSlice } from "@reduxjs/toolkit"

export interface credentials {
  id: number | null;
  username: string;
  userlevel: string;
}

export const slice = createSlice({
  name: 'auth',
  initialState: {
    authCredentials: {id: null, username: '', userlevel: ''} as credentials,
    isAuthenticated: false as boolean
  },
  reducers: {
    login: (state, action) => {
      state.authCredentials = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.authCredentials = {id: null, username: '', userlevel: ''}
      state.isAuthenticated = false
    }
  }
})

export const { login, logout } = slice.actions;

export const getCredentials = (state: any) => { return state.auth.authCredentials }
export const getAuthenticated = (state: any) => state.auth.isAuthenticated

export default slice.reducer
