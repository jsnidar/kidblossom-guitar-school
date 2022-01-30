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
import Home from './Home';

function App() {
  const [ currentUser, setCurrentUser ] = useState({})
  const [ loggedIn, setLoggedIn ] = useState(false)

  const logIn = (user) => {
    console.log(user)
    const formattedUser = user.data.attributes ? {...user.data.attributes, client_account: user.included[0].attributes} : {}
    setCurrentUser(formattedUser)
    setLoggedIn(true)
  }

  const logOut = () => {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

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

  console.log(currentUser)

  return (
    <>
      <NavBar loggedIn={loggedIn} logOut={logOut} currentUser={currentUser} />
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={ loggedIn && currentUser ? <Profile
             loggedIn={loggedIn} 
             logIn={logIn} 
             currentUser={currentUser}
            /> : <Home />}
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
