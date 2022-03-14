import { createSlice } from "@reduxjs/toolkit";
import { headers, getToken } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";

export function logInFetch(strongParams) {
  return function (dispatch) {
    
    dispatch({ type: "users/userLoginLoading"});
    fetch('/login', {
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
          dispatch(setErrors([]))
          dispatch(userFetchSucceeded())
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
    dispatch({ type: "users/userLoginLoading"});
    fetch('/get-current-user', {
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
          dispatch(setErrors([]))
          dispatch(userFetchSucceeded())
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
  },
  reducers: {
    userLoginLoading(state, action) {
      state.status = "loading"
    },
    userFetchRejected(state, action) {
      state.status = "rejected"
    },
    userFetchSucceeded(state, action) {
      state.status = "succeeded"
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
    userUpdated(state, action) { 
      const user = state.entities.find((user) => user.id === action.payload.id)
      if (user) {
          user.id = action.payload.id
          user.first_name = action.payload.first_name
          user.last_name = action.payload.last_name
          user.primary_email = action.payload.primary_email
          user.primary_phone = action.payload.primary_phone
          user.address = action.payload.address
          user.city = action.payload.city
          user.state = action.payload.state
          user.zip_code = action.payload.zip_code
          user.client_account.receive_notifications = action.payload.client_account.receive_notifications
      }
    },
    userLogout(state, action) {
      state.entities = action.payload
    },
    userLogoutStatus(state, action) {
      state.status = 'idle'
    },
  },
});

// export the action creators
export const { userLoggedIn, userLogout, userLogoutStatus, userFetchSucceeded, userFetchRejected, usersFetched, userLogInFetch, userUpdated } = userSlice.actions;

export default userSlice.reducer;

export const selectAllUsers = state => state.user.entities 

export const selectUserById = (state, userId) => state.user.entities.find(user => user.id === parseInt(userId))
