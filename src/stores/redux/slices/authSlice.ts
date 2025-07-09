import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: {
    uid: "",
    email: "cris@gmail.com",
    displayName: "Cris",
    photoURL: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
