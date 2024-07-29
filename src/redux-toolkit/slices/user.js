import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginData:{},
    signupData:{
        name:'',
        email:'',
        password:'',
        role:'',
    },
    login:false,
    focused:false,
    menu:false,
    forgetPassword:{},
    newPassword:{},
    resetPassword:{},
    error:{},
    prevVisitedPage:1,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        handleLoginData:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.loginData[name] = value;
        },
        handleSignupData:(state,action) => {
            const {name,value} = action.payload
            state.error = {};
            state.signupData[name] = value;
        },
        handleError:(state,action) => {
            state.error = action.payload;
        },
        handleLogin:(state,action) => {
            state.login = action.payload;
        },
        initiateLoginData:(state,action) => {
            state.loginData = {};
        },
        initiateSignupData:(state,action) => {
            state.signupData = {
                name:'',
                email:'',
                password:'',
                role:'student',
            };
        },
       
        handlePrevVisitedPage:(state,action) => {
            state.prevVisitedPage = action.payload
        },
        handleMenu:(state,action) => {
            state.menu = !(state.menu)
        }
    }
})

export const 
    {
        handleLoginData,
        handleSignupData,
        handleError,
        handleForgetPassword,
        handleNewPassword,
        handleResetPassword,
        initiateResetPassword,
        handleLogin,
        initiateLoginData,
        initiateSignupData,
       
        handlePrevVisitedPage,
        initiateForgetPassword,
        handleMenu
    } = userSlice.actions;

export default userSlice.reducer;