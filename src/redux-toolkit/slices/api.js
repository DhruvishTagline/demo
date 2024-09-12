import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosInstance } from '../../axiosInastance/axiosInstance';

const initialState = {
    data:{},
    status:'',
    error:''
}

export const fetchData = createAsyncThunk('data/fetchData', async(config) => {
    try{
        const data = await axiosInstance(config);
        console.log('data :>> ', data);
        return data.data;
    }catch (e){
        console.log('e :>> ', e);
        console.log('e.response.data.details.body.map(item=>item.message) :>> ', e.response.data.details.body.map(item=>item.context.label));
        const res={      
            statusCode: e.response.data.statusCode,
            message: e.response.data.message
        }
        return res; 
    }
});

const apiSlice = createSlice({
    name:'api',
    initialState : initialState,
    extraReducers: (builder) => {        
        builder
            .addCase(fetchData.pending, (state,action) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state,action) => {
                state.status = 'ideal';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state,action) => {
                state.status = 'error';
                state.error = action.payload || 'Something went Wrong';
            })
    }
})

export default apiSlice.reducer;