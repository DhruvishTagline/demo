import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loginData:{email:'',password:''},
    signupData:{name:'',email:'',password:'',role:''},
    login:false,
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
            state.loginData[name] = value.trim();
        },
        handleSignupData:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.signupData[name] = value.trim();
        },
        handleError:(state,action) => {
            state.error = action.payload;
        },
        handleLogin:(state,action) => {
            state.login = action.payload;
        },
        handleResetPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.resetPassword[name] = value.trim();
        },

        initiateLoginData:(state,action) => {
            state.loginData = {};
        },
        initiateSignupData:(state,action) => {
            state.signupData = {};
        },
        initiateForgetPassword:(state,action) => {
            state.forgetPassword = action.payload
        },
        initiateResetPassword:(state,action) => {
            state.error = {};
            state.resetPassword = action.payload;
        },     
        handlePrevVisitedPage:(state,action) => {
            state.prevVisitedPage = action.payload
        },
        handleMenu:(state,action) => {
            state.menu = !(state.menu)
        },
        handleForgetPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.forgetPassword[name] = value.trim();
        },
        handleNewPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.newPassword[name] = value.trim();
        },
        
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



