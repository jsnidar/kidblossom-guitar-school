import { createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers } from "../../Globals";

export function logInFetch(strongParams) {
  return function (dispatch) {
    
    dispatch({ type: "users/userLoginLoading"});
    fetch(baseUrl + '/login', {
      method: "POST",
      headers,
      body: JSON.stringify(strongParams)
    })
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => {
          dispatch(userLoggedIn(data.user));
          localStorage.setItem('jwt', data.token)
        })
      }else{
        res.json().then(errors => dispatch(setErrors(errors)))
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
    errors: null
  },
  reducers: {
    resetErrors(state, action) {
      state.errors = null
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
      state.errors = null
    },
    userLogout(state, action) {
      state.loggedIn = false
      state.entities = state.entities.filter( user => user.id !== action.payload)
    },
    setErrors(state, action) {
      state.errors = action.payload
    },
    studentAdded(state, action) {
      state.entities.user.client_account.students.push({
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        birth_date: action.payload.birth_date,
        gender: action.payload.gender
      });
    },
    studentRemoved(state, action) {
      state.entities = state.entities.user.client_account.students.filter( student => student.id !== action.payload)
    },
    userLoginLoading(state, action) {
      state.status = "loading"
    },
  },
});

// export the action creators
export const { userLoggedIn, userLogout, resetErrors, setErrors } = userSlice.actions;

export default userSlice.reducer;
