import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import studentsReducer from './features/students/studentsSlice';
import errorsReducer from './errorHandling/errorsSlice';
import coursesReducer from './features/courses/coursesSlice';
import instructorsReducer from './features/instructors/instructorsSlice';
import { apiSlice } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentsReducer,
    courses: coursesReducer,
    errors: errorsReducer, 
    instructors: instructorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
