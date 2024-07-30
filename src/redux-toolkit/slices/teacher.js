
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
    questions:[],
    edited:false,
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
        loadViewExamData:(state,action) => {
            state.viewExam = action.payload;
        },
        loadCurrStudentDetail:(state,action) => {
            state.currStudentDetail = action.payload;
        },

        handleError:(state,action) => {
            state.error = action.payload;
        },
        
        handleAns:(state,action) => {
            state.edited = true
            const {queIndex,ans} = action.payload;
            console.log("ans",ans)
            state.error = {};
            state.createExam.questions[queIndex].answer = ans;
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleOptions:(state,action) => {
            state.edited = true
            const {queIndex,opIndex,value} = action.payload;
            state.error = {};
            if(state.createExam.questions[queIndex].options[opIndex] === state.createExam.questions[queIndex].answer && state.ansIndex[queIndex] === opIndex){
                state.createExam.questions[queIndex].answer = value;
            }
            state.createExam.questions[queIndex].options[opIndex] = value;
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleQuestion:(state,action) => {
            state.edited = true
            const {name,value,queIndex} = action.payload;
            state.error = {};
            state.createExam.questions[queIndex][name] = value
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleSubject:(state,action) => {
            state.edited = true
            const {name,value} = action.payload;
            state.error = {};
            state.createExam[name] = value
            localStorage.setItem('createExam',JSON.stringify(state.createExam))
        },
        handleAnsIndexes:(state,action) => {
            state.ansIndex[action.payload.currQuestion] = action.payload.ansIndex;
            localStorage.setItem('ansIndex',JSON.stringify(state.ansIndex))
        },

        initiateExam:(state,action) => {
            state.error = {};
            state['createExam'] = action.payload;
        },
        initiateAnsIndex:(state,action) => {
            state.ansIndex = action.payload
        },
        initiateQuestions:(state,action) => {
            state.questions = [];
        },

        addNewQuestion:(state,action) => {
            state.createExam.questions.push(action.payload);
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
        initiateAnsIndex,
        initiateExam,
        addNewQuestion,
        handleAns,
        handleQuestion,
        handleSubject,
        initiateQuestions,
        handleOptions,
        handleAnsIndexes,


        

    } = teacherSlice.actions;

export default teacherSlice.reducer;






