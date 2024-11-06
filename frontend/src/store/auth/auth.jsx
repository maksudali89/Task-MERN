import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, tasks: [] },
  reducers: {
    LoginUser: (state, action) => {
      state.isLoggedIn = true;
    },
    LogOut: (state, action) => {
      state.isLoggedIn = false;
    },
    AddTask :(state,action)=>{
      state.tasks.push(action.payload)
    }
  },
});
// export 
export const { LoginUser, LogOut,AddTask } = AuthSlice.actions;
export default AuthSlice.reducer;
