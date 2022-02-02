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



function App() {

  const loggedIn = useSelector(state => state.user.loggedIn)
  const user = useSelector(state => state.user.entities[0])
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userLogout(user.id));
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      dispatch(verifyLoggedIn(token))
    }
  },[loggedIn, dispatch])

  return (
    <>
      <NavBar loggedIn={loggedIn} logOut={logOut} />
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={ loggedIn && user ? <Profile
             loggedIn={loggedIn} 
            /> : <Home />}
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
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
