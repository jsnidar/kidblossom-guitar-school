import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Profile from '../features/user/Profile';
import NavBar from '../features/navigation/NavBar';
import SignUp from '../features/user/SignUp';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogIn from '../features/user/LogIn';
import Home from './Home';
import { verifyLoggedIn } from "../features/user/userSlice";
import CoursesContainer from '../features/courses/CoursesContainer';
import CourseCard from '../features/courses/CourseCard';
import CourseForm from '../features/courses/CourseForm';
import InstructorsContainer from '../features/instructors/InstructorsContainer';
import InstructorPage from '../features/instructors/InstructorPage';
import InstructorForm from '../features/instructors/InstructorForm';
import StudentPage from '../features/students/StudentPage';
import StudentForm from '../features/students/StudentForm';
import StudentsContainer from '../features/students/StudentsContainer';
import Dashboard from '../features/user/Dashboard';

function App() {

  const userStatus = useSelector(state => state.user.status)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(userStatus === 'idle') {
      dispatch(verifyLoggedIn(token))
    }
  },[userStatus, dispatch])

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={userStatus !== 'succeeded' ? <Home /> : <Dashboard />}
          />
          <Route 
            path='/signup' 
            element={
              <SignUp />
            } 
          />
          <Route 
            path='/login' 
            element={
              <LogIn />
            } 
          />
          <Route path='/users/:userId' element={<Profile />} />
          
          <Route path='/students' element={<StudentsContainer />} />
          <Route path='/students/:studentId' element={<StudentPage />} />
          <Route path='/students/:studentId/edit' element={<StudentForm />} />
          <Route path='/students/new' element={<StudentForm />} />
          
          <Route path='/classes' element={<CoursesContainer />} />
          <Route path='/classes/:classId' element={<CourseCard />} />
          <Route path='/classes/:classId/edit' element={<CourseForm />} />
          <Route path='/classes/new' element={<CourseForm />} />
          
          <Route path='/instructors' element={<InstructorsContainer /> } />
          <Route path='/instructors/:instructorId' element={<InstructorPage />} />
          <Route path='/instructors/:instructorId/edit' element={<InstructorForm />} />
          <Route path='/instructors/new' element={<InstructorForm />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
