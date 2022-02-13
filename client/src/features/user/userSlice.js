import { createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers, getToken } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";

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
          localStorage.setItem('jwt', data.token)
          dispatch(userLogInFetch(data.user))
          dispatch(userLoggedIn(true));
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
        .then(data => {
          dispatch(userLogInFetch(data.user))
          dispatch(userLoggedIn(true));
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
    usersFetched(state, action) {
      state.entities = action.payload;
    },
    userLogInFetch(state, action) {
      state.entities = [...state.entities, {
        id: action.payload.id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        primary_email: action.payload.primary_email,
        primary_phone: action.payload.primary_phone,
        address: action.payload.address,
        city: action.payload.city,
        state: action.payload.state,
        zip_code: action.payload.zip_code,
        client_account: action.payload.client_account,
        role: action.payload.role
      }];
    },
    userLoggedIn(state, action) {
      state.loggedIn = action.payload
    },
    userLogout(state, action) {
      state.entities = action.payload
    },
  },
});

// export the action creators
export const { userLoggedIn, userLogout, userFetchRejected, usersFetched, userLogInFetch } = userSlice.actions;

export default userSlice.reducer;
