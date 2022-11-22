import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count:0
}

export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        addNumber: (state) => {
            state.count += 1;
        },
        minusNumber: (state) => {
            state.count -= 1;
        },
        resetState : (state) => {
            state.count = 0;
        },
        addByAmount : (state,action) => {
            state.count += action.payload;
        }
    }
    
});

export const{addNumber,minusNumber,resetState,addByAmount} = counterSlice.actions;

export default counterSlice.reducer;