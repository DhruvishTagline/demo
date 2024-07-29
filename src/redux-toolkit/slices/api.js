import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../../axiosInastance/axiosInstance';

const initialState = {
    data:{},
    status:'',
    error:''
}

export const fetchData = createAsyncThunk('data/fetchData', async(config) => {
    
    try{
        let data = await axiosInstance(config);
        console.log("data we got by fetchData",data)
      
        return data.data;
    }catch (e){
        throw new Error(e);
    }
})

const apiSlice = createSlice({
    name:'api',
    initialState : initialState,
    reducers:{
        addData: () => {
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state,action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state,action) => {
                state.status = 'ideal';
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state,action) => {
                state.status = 'error';
                state.error = action.payload || 'Something went Wrong'
            })

    }
})

export default apiSlice.reducer;