"use client"
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { fetchUserDetails } from "../reducer-services/user";
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 }); // Cookie expires in 7 days
    },
    logout: (state) => {
      Cookies.remove("user");
      Cookies.remove("token");

      state.user = null;
    },
    setUser(state, action) {
      state.user = {
    ...state.user,
    ...action.payload,
  };
  console.log("action.payload",action.payload)
  console.log("state.user",state.user)
    },
    setTeacher(state, action) {
      console.log(action.payload)
      state.user.is_teacher = true;
      state.user.teacher_profile = action.payload;
    },
    setFavourites(state, action) {
      // Check if the course ID already exists in the array
      if (!state.user.favourites.includes(action.payload)) {
        state.user.favourites.push(action.payload);
      }
    },
    removeFavourites(state, action) {
      console.log(
        state.user.favourites.filter((fav) => fav.courseId != action.payload)
      );
      state.user.favourites = state.user.favourites.filter(
        (fav) => fav.courseId !== action.payload
      );
    },
    updateUserPersonalInfo(state, action) {
      const { firstName, lastName, email, role, token, image, phone } =
        action.payload;

      if (Array.isArray(state)) return state;

      state.user.firstName = firstName ?? state.user.firstName;
      state.user.lastName = lastName ?? state.user.lastName;
      state.user.email = email ?? state.user.email;
      state.user.role = role ?? state.user.role;
      state.user.phone = phone ?? state.user.phone;
      state.user.token = token ?? state.user.token;
      state.user.image = image ?? state.user.image;
    },
    updateTrainingDetailsInfo(state, action) {
      if (!state.trainingDetails) {
        state.trainingDetails = {};
      }

      state.user.trainingDetails.name =
        action.payload?.name ?? state.user.trainingDetails.name;
      state.user.trainingDetails.description =
        action.payload?.description ?? state.user.trainingDetails.description;
      state.user.trainingDetails.yearsOfExperience =
        action.payload?.yearsOfExperience ??
        state.trainingDetails.yearsOfExperience;
      state.user.trainingDetails.teachingRole =
        action.payload?.teachingRole ?? state.user.trainingDetails.teachingRole;
      state.user.trainingDetails.previousCompany =
        action.payload?.previousCompany ??
        state.user.trainingDetails.previousCompany;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  login,
  logout,
  setUser,
  setTeacher,
  setFavourites,
  removeFavourites,
  updateTrainingDetailsInfo,
  updateUserPersonalInfo,
} = authSlice.actions;
export default authSlice.reducer;
