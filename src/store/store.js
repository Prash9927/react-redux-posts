import { configureStore } from '@reduxjs/toolkit';
// import counterSlice from '../slice/counterSlice';
import postReducer from '../slice/postSlice'
import userReducer from '../slice/userSlice'


const store = configureStore({
    reducer:{
        // counter:counterSlice,
        posts:postReducer,
        users:userReducer
    }
})

export default store;