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
            const {name,value} = action.payload;
            state.error = {};
            state.signupData[name] = value;
            console.log('state.signupData :>> ', state.signupData[name]);
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
            state.resetPassword[name] = value;
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
            state.forgetPassword[name] = value;
        },
        handleNewPassword:(state,action) => {
            const {name,value} = action.payload;
            state.error = {};
            state.newPassword[name] = value;
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