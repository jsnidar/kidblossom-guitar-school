import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import studentsReducer from './features/students/studentsSlice';
import errorsReducer from './errorHandling/errorsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentsReducer,
    errors: errorsReducer
  },
});

export default store;
