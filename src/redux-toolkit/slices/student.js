import { ExpandMoreSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { loadAllStudentData } from "./teacher";

const initialState={
    allExamData:[],
    examPaper:{},
    studentProfile:{},
    error:{}
}

export const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        loadAllExamData:(state,action)=>{
            console.log('action :>> ', action);
            state.allExamData=action.payload;
        },
        loadExamPaper:(state,action) => {
            state.examPaper = action.payload;
        },
        loadStudentProfile:(state,action) => {
            state.studentProfile = action.payload;
        },

        handleStudentAns:(state,action) => {
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.examPaper.questions[queIndex].answer = ans;
            localStorage.setItem('examPaper',JSON.stringify(state.examPaper))
        },
        handleStudentError:(state,action) => {
            state.error = action.payload;
        },

        initiateExamPaper:(state,action) => {
            state.examPaper = action.payload
        },

        cancelExam:(state,action) => {
            state.examPaper = {};
        },
        
        updateProfile:(state,action) => {
            const {name,value} = action.payload;
            state.error = {}
            state.studentProfile[name] = value;
        },
    }
})

export const 
    {
        loadAllExamData,
        handleStudentAns,
        cancelExam,
        loadExamPaper,
        initiateExamPaper,
        handleStudentError,
        loadStudentProfile,
        updateProfile

    } = studentSlice.actions;

export default studentSlice.reducer;