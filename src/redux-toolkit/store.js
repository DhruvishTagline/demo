import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/user";
import  apiSlice from './slices/api'
import  teacherSlice  from "./slices/teacher";
import  studentSlice  from "./slices/student";


export const store = configureStore({
    reducer:{
        api:apiSlice,
        user:userSlice,
        teacher:teacherSlice,
        student:studentSlice,
    }
})