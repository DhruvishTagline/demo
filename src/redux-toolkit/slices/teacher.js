import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allStudentData:[],
    verifiedStudentData:[],
    error:{},
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
                ]
            }
        ],
        notes:['test notes']
    },
    ansIndex:[],
    
}

export const teacherSlice = createSlice({
    name:'teacher',
    initialState,
    reducers:{
        loadAllStudentData:(state,action) => {
            state.allStudentData = action.payload;
        },

        loadVerifiedStudentData:(state,action) => {
            state.verifiedStudentData = action.payload;
        },

        handleError:(state,action) => {
            state.error = action.payload;
        },
        
        loadViewExamData:(state,action) => {
            state.viewExam = action.payload;
        },
        loadCurrStudentDetail:(state,action) => {
            state.currStudentDetail = action.payload;
        },

        handleSubject:(state,action) => { 
            const {value} = action.payload;
            state.error = {};
            state.createExam.subjectName = value; 
        },
        handleQuestion:(state,action) => {
            console.log("handle question called");
            const {name,value,qIndex} = action.payload;
            console.log("name-value",name,value,qIndex);
            state.error = {};
            state.createExam.questions[qIndex][name] = value
        },
        handleAns:(state,action) => {
            const {queIndex,ans} = action.payload;
            console.log("ans",ans);
            state.error = {};
            state.createExam.questions[queIndex].answer = ans;
        },
        handleOptions:(state,action) => {
            state.edited = true
            const {queIndex,opIndex,value} = action.payload;
            state.error = {};
            if(state.createExam.questions[queIndex].options[opIndex] === state.createExam.questions[queIndex].answer && state.ansIndex[queIndex] === opIndex){
                state.createExam.questions[queIndex].answer = value;
            }
            state.createExam.questions[queIndex].options[opIndex] = value;
        },
        initiateExam:(state,action) => {
            state.error = {};
            state['createExam'] = action.payload;
        },
        initiateQuestions:(state,action) => {
            state.questions = [];
        },
        initiateAnsIndex:(state,action) => {
            state.ansIndex = action.payload
        },
             
    }
})

export const 
    {
        loadAllStudentData,
        loadVerifiedStudentData,
        handleError,
        loadViewExamData,
        loadCurrStudentDetail,  
        handleSubject, 
        handleQuestion, 
        handleAns,
        handleOptions,
        initiateExam,
        initiateQuestions,
        initiateAnsIndex

    } = teacherSlice.actions;

export default teacherSlice.reducer;