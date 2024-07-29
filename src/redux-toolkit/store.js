import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/user";
import apiSlice from './slices/api'
import  teacherSlice  from "./slices/teacher";


export const store = configureStore({
    reducer:{
        user:userSlice,
        api:apiSlice,
        teacher:teacherSlice,
       
    }
})