import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users:[],
    status:'idle'
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async() => {
    console.log('insdie fun');
    try {
        const response = axios.get(USERS);
        return response;
    } catch (error) {
        
        return error.message;   
    }
});

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getAllUsers.fulfilled,(state,action) => {
            state.users = action.payload.data;
            state.status = 'success'
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;