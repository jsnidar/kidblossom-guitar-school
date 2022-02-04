import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import studentsReducer from './features/students/studentsSlice';
import errorsReducer from './errorHandling/errorsSlice';
import coursesReducer from './features/courses/coursesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    students: studentsReducer,
    courses: coursesReducer,
    errors: errorsReducer
  },
});

export default store;
