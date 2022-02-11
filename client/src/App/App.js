import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Profile from '../features/user/Profile';
import NavBar from '../features/navigation/NavBar';
import SignUp from '../features/user/SignUp';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogIn from '../features/user/LogIn';
import Home from './Home';
import { verifyLoggedIn, userLogout, userLoggedIn } from "../features/user/userSlice";
import CoursesContainer from '../features/courses/CoursesContainer';
import CourseCard from '../features/courses/CourseCard';
import CourseForm from '../features/courses/CourseForm';
import InstructorsContainer from '../features/instructors/InstructorsContainer';
import InstructorPage from '../features/instructors/InstructorPage';
import InstructorForm from '../features/instructors/InstructorForm';
import StudentPage from '../features/students/StudentPage';
import StudentForm from '../features/students/StudentForm';
import StudentsContainer from '../features/students/StudentsContainer';

function App() {

  const loggedIn = useSelector(state => state.user.loggedIn)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userLogout(null))
    dispatch(userLoggedIn(false));
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      dispatch(verifyLoggedIn(token))
    }
  },[loggedIn, dispatch])

  const setHomeRoute = () => {
    if (loggedIn && currentUser) {
    return <Profile
             loggedIn={loggedIn} 
            />
    }else{
      return <Home />
    }
  }

  const setCoursesRoute = () => {
    if (loggedIn && (currentUser.role === 'admin' || currentUser.role === "instructor")) {
      return <CoursesContainer />     
    }else{
      return <Home />
    }
  }

  const setInstructorsRoute = () => {
    if (loggedIn && currentUser.role === 'admin') {
      return <InstructorsContainer />     
    }else{
      return <Home />
    }
  }

  return (
    <>
      <NavBar loggedIn={loggedIn} logOut={logOut} />
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={setHomeRoute()}
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
          <Route path='/students' element={<StudentsContainer />} />
          <Route path='/students/:studentId' element={<StudentPage />} />
          <Route path='/students/:studentId/edit' element={<StudentForm />} />
          <Route path='/students/new' element={<StudentForm />} />
          <Route path='/classes' element={<CoursesContainer />} />
          <Route path='/classes/:classId' element={<CourseCard />} />
          <Route path='/classes/:classId/edit' element={<CourseForm />} />
          <Route path='/classes/new' element={<CourseForm />} />
          <Route 
            path='/instructors' 
            element={<InstructorsContainer /> }
          />
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
