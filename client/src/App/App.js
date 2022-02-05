import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from '../features/user/Profile';
import NavBar from '../features/navigation/NavBar';
import SignUp from '../features/user/SignUp';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogIn from '../features/user/LogIn';
import Home from './Home';
import { verifyLoggedIn, userLogout } from "../features/user/userSlice";
import CoursesContainer from '../features/courses/CoursesContainer';

function App() {

  const loggedIn = useSelector(state => state.user.loggedIn)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userLogout(currentUser.id));
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
              <LogIn loggedIn={loggedIn} />
            } 
          />
          <Route 
            path='/courses' 
            element={
              <CoursesContainer />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
