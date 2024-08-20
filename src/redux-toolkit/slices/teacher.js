import { createSlice } from "@reduxjs/toolkit";
import { setItemLocal } from "../../utils/localStorageFunction";

const initialState = {
    allStudentData:[],
    verifiedStudentData:[],
    error:[],
    viewExam:[],
    currStudentDetail:{},
    createExam:{
        subjectName:'',
        questions:[
            {
                question:'',
                options:[
                    '',
                    '',
                    '',
                    ''
                ],
                answer:""
            }
        ],
        notes:['test notes']
    },
    questions:[],
    edited:false,
    ansIndex:[],
    searchQuery:'',
    filteredData:[]
}

export const teacherSlice = createSlice({
    name:'teacher',
    initialState,
    reducers:{
        loadAllStudentData:(state, action) => {
            state.allStudentData = action.payload;
        },
        loadVerifiedStudentData:(state, action) => {
            state.verifiedStudentData = action.payload;
        },    
        loadViewExamData:(state, action) => {
            state.viewExam = action.payload;
        },
        loadCurrStudentDetail:(state, action) => {
            state.currStudentDetail = action.payload;
        },
        
        handleError:(state, action) => {            
           state.error = {...state.error,...action.payload}
        },
        handleAns:(state, action) => {
            state.edited = true;
            const {queIndex, ans} = action.payload;
            state.error = {...state.error};
            state.createExam.questions[queIndex].answer = ans;
            localStorage.setItem('createExam', JSON.stringify(state.createExam));
        },
        handleOptions:(state, action) => {
            state.edited = true;
            const {queIndex, opIndex, value} = action.payload;
            state.error = {...state.error,answer:''};
            state.createExam.questions[queIndex].options[opIndex] = value;
            setItemLocal('createExam', JSON.stringify(state.createExam));
        },
        handleQuestion:(state, action) => {
            state.edited = true;
            const {name, value, queIndex} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex][name] = value;
            setItemLocal('createExam', JSON.stringify(state.createExam));
        },
        handleQuestions:(state, action) => {
            state.edited = true;
            const questions = action.payload;
            state.createExam.questions = questions;
            setItemLocal('createExam', JSON.stringify(state.createExam));
        },
        handleSubject:(state, action) => {
            state.edited = true;
            const {name, value} = action.payload;
            state.error = {};
            state.createExam[name] = value;          
            setItemLocal('createExam', JSON.stringify(state.createExam));
        },
        handleAnsIndexes:(state, action) => {
            state.error = { ...state.error , answer:'' }
            state.ansIndex[action.payload.currQuestion] = action.payload.ansIndex;
            setItemLocal('ansIndex', JSON.stringify(state.ansIndex));
        },
        handleEdited:(state, action) => {
            state.edited = false;
        },

        initiateExam:(state, action) => {
            state.error = {};
            state['createExam'] = action.payload;
        },
        initiateAnsIndex:(state, action) => {
            state.ansIndex = action.payload;
        },
        initiateQuestions:(state, action) => {
            state.questions = [];
        },

        updateSearchQuery:(state, action) => {
            state.searchQuery = action.payload.trim();
        },
        updateFilteredData:(state, action) => {
            state.filteredData = action.payload;
        },

        addNewQuestion:(state, action) => {
            state.error={};
            state.createExam.questions.push(action.payload);
        },
        setAnsIndex:(state, action) => {
            state.ansIndex = [];
            state.ansIndex.splice();
        }
    }
})

export const {
    loadAllStudentData,
    loadVerifiedStudentData,
    handleError,
    loadViewExamData,
    loadCurrStudentDetail,   
    initiateAnsIndex,
    initiateExam,
    addNewQuestion,
    handleAns,
    handleQuestion,
    handleQuestions,
    handleSubject,
    initiateQuestions,
    handleOptions,
    handleAnsIndexes,
    handleEdited,
    setAnsIndex,
    updateSearchQuery,
    updateFilteredData
} = teacherSlice.actions;

export default teacherSlice.reducer;





