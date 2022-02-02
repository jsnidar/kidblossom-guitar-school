import { createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers, getToken } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";
import { studentsFetched } from "../students/studentsSlice";

export function logInFetch(strongParams) {
  return function (dispatch) {
    
    dispatch({ type: "users/userLoginLoading"});
    fetch(baseUrl + '/login', {
      method: "POST",
      headers: {
        ...headers,
        ...getToken()
      },
      body: JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => {
          dispatch(userLoggedIn(data.user));
          dispatch(studentsFetched(data.user.students))
          dispatch(setErrors([]))
          localStorage.setItem('jwt', data.token)
        })
      }else{
        res.json().then(errors => {
          dispatch(userFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }
}

export function verifyLoggedIn() {
  return function (dispatch) {
    fetch(baseUrl + '/get-current-user', {
      method: "GET",
      headers: {
        ...headers,
        ...getToken()
      }
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(user => {
          console.log(user)
          dispatch(userLoggedIn(user));
          dispatch(studentsFetched(user.students))
          dispatch(setErrors([]))
        })
      }else{
        res.json().then(errors => {
          dispatch(userFetchRejected())
          dispatch(setErrors(errors))
        })
      }
    })
  }
}


  
const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: [],
    status: 'idle',
    loggedIn: false,
  },
  reducers: {
    userLoginLoading(state, action) {
      state.status = "loading"
    },
    userFetchRejected(state, action) {
      state.status = "rejected"
    },
    userLoggedIn(state, action) {
      state.entities.push({
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        primary_email: action.payload.primary_email,
        primary_email_confirmation: action.payload.primary_email_confirmation,
        primary_phone: action.payload.primary_phone,
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        zip_code: action.payload.zip_code,
        password: action.payload.password,
        password_confirmation: action.payload.password_confirmation,
        client_account: action.payload.client_account
      });
      state.status = "idle"
      state.loggedIn = true
    },
    userLogout(state, action) {
      state.loggedIn = false
      state.entities = state.entities.filter( user => user.id !== action.payload)
    },
  },
});

// export the action creators
export const { userLoggedIn, userLogout, userFetchRejected } = userSlice.actions;

export default userSlice.reducer;
