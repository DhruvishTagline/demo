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

        handleStudentAns:(state,action) => {
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.examPaper.questions[queIndex].answer = ans;
            localStorage.setItem('examPaper',JSON.stringify(state.examPaper))
        },

        initiateExamPaper:(state,action) => {
            state.examPaper = action.payload
        },

        cancelExam:(state,action) => {
            state.examPaper = {};
        },
        
    }
})

export const 
    {
        loadAllExamData,
        handleStudentAns,
        cancelExam,
        loadExamPaper,
        initiateExamPaper

    } = studentSlice.actions;

export default studentSlice.reducer;