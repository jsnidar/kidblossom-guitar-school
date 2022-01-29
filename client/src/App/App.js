import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from '../features/user/Profile';
import NavBar from '../features/navigation/NavBar';
import SignUp from '../features/user/SignUp';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAdded } from '../features/user/usersSlice';
import { headers, getToken } from '../Globals';
import LogIn from '../features/user/LogIn';

function App() {
  const [ currentUser, setCurrentUser ] = useState({})
  const [ loggedIn, setLoggedIn ] = useState(false)

  const logIn = (user) => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logOut = () => {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  console.log(currentUser)
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      fetch('/current-user', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        }
      })
        .then(resp => resp.json())
        .then(user => logIn(user))
    }
  },[loggedIn])
  return (
    <>
      <NavBar logOut={logOut} currentUser={currentUser} />
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={
              <Profile logIn={logIn} currentUser={currentUser} />
            } 
          />
          <Route 
            path='/signup' 
            element={
              <SignUp logIn={logIn} />
            } 
          />
          <Route 
            path='/login' 
            element={
              <LogIn logIn={logIn} />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
