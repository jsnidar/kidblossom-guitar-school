import { createSlice } from "@reduxjs/toolkit";
import { baseUrl, headers, getToken } from "../../Globals";
import { setErrors } from "../../errorHandling/errorsSlice";
import { studentsFetched } from "../students/studentsSlice";
import { coursesFetched } from "../courses/coursesSlice";

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
          dispatch(userLoggedIn(data.user));
          if (data.users) {
            usersFetched(data.users)
          }
          dispatch(studentsFetched(data.students))
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
          dispatch(userLoggedIn(data.user));
          if (data.users) {
            usersFetched(data.users)
          }
          dispatch(studentsFetched(data.students))
          dispatch(coursesFetched(data.courses))
          dispatch(setErrors([]))
        })
        debugger
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
    currentUser: {},
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
    userLoggedIn(state, action) {
      state.currentUser = {
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
      };
      state.status = "idle"
      state.loggedIn = true
    },
    userLogout(state, action) {
      state.loggedIn = false
      state.currentUser = null
    },
  },
});

// export the action creators
export const { userLoggedIn, userLogout, userFetchRejected, usersFetched } = userSlice.actions;

export default userSlice.reducer;
